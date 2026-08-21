const express = require('express');
const router = express.Router();
const cricbuzzService = require('../services/cricbuzzService');
const { requireAuth } = require('../middleware/auth');
const { run, query, get } = require('../database/db');
const { evaluatePlayerTalent } = require('../services/mlEngine');

async function triggerTalentRecalculation(playerId) {
    try {
        const player = await get('SELECT * FROM player_profiles WHERE id = ?', [playerId]);
        if (!player) return;
        const batting = await get('SELECT * FROM batting_stats WHERE player_id = ?', [playerId]);
        const bowling = await get('SELECT * FROM bowling_stats WHERE player_id = ?', [playerId]);
        const fielding = await get('SELECT * FROM fielding_stats WHERE player_id = ?', [playerId]);
        const physicalTests = await query('SELECT * FROM physical_tests WHERE player_id = ?', [playerId]);
        const cvAssessments = await query('SELECT * FROM cv_assessments WHERE player_id = ?', [playerId]);
        const progressHistory = await query('SELECT * FROM progress_history WHERE player_id = ?', [playerId]);

        const result = await evaluatePlayerTalent({
            player, batting, bowling, fielding, physicalTests, cvAssessments, progressHistory
        }, player.primary_role);

        await run(
            `INSERT OR REPLACE INTO talent_scores (
                id, player_id, overall_talent_potential, current_performance_score, athletic_potential_score,
                technical_skill_score, consistency_score, development_trajectory_score, talent_tier,
                primary_archetype, secondary_archetype, archetype_similarity_pct, prediction_confidence,
                sample_size_matches, strengths_json, development_areas_json, ai_recommendations_json, explainability_factors_json
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                `ts_${playerId}`, playerId, result.overall_talent_potential, result.current_performance_score,
                result.athletic_potential_score, result.technical_skill_score, result.consistency_score,
                result.development_trajectory_score, result.talent_tier, result.primary_archetype,
                result.secondary_archetype, result.archetype_similarity_pct, result.prediction_confidence,
                result.sample_size_matches, JSON.stringify(result.strengths), JSON.stringify(result.development_areas),
                JSON.stringify(result.ai_recommendations), JSON.stringify(result.explainability_factors)
            ]
        );
    } catch (err) {
        console.error('Recalculation error:', err);
    }
}

router.get('/matches', requireAuth, async (req, res) => {
    try {
        const data = await cricbuzzService.fetchFromApi('matches/v1/recent');
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/ingest-scorecard', requireAuth, async (req, res) => {
    try {
        const { matchId } = req.body;
        if (!matchId) return res.status(400).json({ error: 'matchId is required' });
        const scorecardData = await cricbuzzService.getScorecard(matchId);
        const result = await cricbuzzService.ingestScorecard(matchId, scorecardData);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/link-player', requireAuth, async (req, res) => {
    try {
        const { starqPlayerId, cricbuzzPlayerId } = req.body;
        if (!starqPlayerId || !cricbuzzPlayerId) {
            return res.status(400).json({ error: 'Required' });
        }
        await run(`UPDATE match_batting_performances SET player_id = ? WHERE cricbuzz_player_id = ?`, [starqPlayerId, String(cricbuzzPlayerId)]);
        await run(`UPDATE match_bowling_performances SET player_id = ? WHERE cricbuzz_player_id = ?`, [starqPlayerId, String(cricbuzzPlayerId)]);
        await run(`UPDATE match_fielding_performances SET player_id = ? WHERE cricbuzz_player_id = ?`, [starqPlayerId, String(cricbuzzPlayerId)]);
        await cricbuzzService.aggregatePlayerStats(cricbuzzPlayerId, starqPlayerId);
        await triggerTalentRecalculation(starqPlayerId);
        res.json({ success: true, message: 'Linked successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
