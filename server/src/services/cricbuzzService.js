const { run, get, query: dbQuery } = require('../database/db');
const { v4: uuidv4 } = require('uuid');

const API_HOST = process.env.RAPIDAPI_HOST || 'cricbuzz-cricket.p.rapidapi.com';
const API_KEY = process.env.RAPIDAPI_KEY;
const BASE_URL = `https://${API_HOST}`;

async function fetchFromApi(endpoint) {
    if (!API_KEY) {
        throw new Error('RAPIDAPI_KEY is not set in environment variables');
    }

    const url = `${BASE_URL}/${endpoint}`;
    console.log(`Fetching from ${url}...`);

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': API_HOST
        }
    });

    if (!response.ok) {
        throw new Error(`Cricbuzz API error: ${response.statusText}`);
    }

    return await response.json();
}

/**
 * Retrieve Scorecard for a match
 */
async function getScorecard(matchId) {
    const data = await fetchFromApi(`matches/get-scorecard-v2?matchId=${matchId}`);
    return data;
}

/**
 * Normalizes scorecard data and stores in SQLite
 */
async function ingestScorecard(matchId, cricbuzzData) {
    if (!cricbuzzData || !cricbuzzData.scorecard) {
        throw new Error('Invalid scorecard data from Cricbuzz');
    }

    // 1. Insert Match if not exists
    await run(
        `INSERT OR IGNORE INTO matches (id, cricbuzz_match_id) VALUES (?, ?)`,
        [`m_${matchId}`, String(matchId)]
    );

    // 2. Loop through scorecard array (innings)
    const scorecardArray = cricbuzzData.scorecard;
    for (let i = 0; i < scorecardArray.length; i++) {
        const inn = scorecardArray[i];
        const inningsId = `inn_${matchId}_${i + 1}`;

        await run(
            `INSERT OR IGNORE INTO innings (id, match_id, innings_number, runs, wickets, overs, declared)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [inningsId, `m_${matchId}`, i + 1, inn.runs || 0, inn.wickets || 0, inn.overs || 0.0, inn.declared ? 1 : 0]
        );

        // Batting performances
        if (inn.batsman && Array.isArray(inn.batsman)) {
            for (const bat of inn.batsman) {
                const perfId = `bat_${inningsId}_${bat.id}`;
                await run(
                    `INSERT OR REPLACE INTO match_batting_performances 
                     (id, match_id, innings_id, cricbuzz_player_id, runs, balls_faced, fours, sixes, strike_rate, how_out)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        perfId, 
                        `m_${matchId}`, 
                        inningsId, 
                        String(bat.id), 
                        bat.runs || 0, 
                        bat.balls || 0, 
                        bat.fours || 0, 
                        bat.sixes || 0, 
                        bat.strkRate || bat.strikeRate || 0.0, 
                        bat.outDesc || bat.how_out || ''
                    ]
                );
            }
        }

        // Bowling performances
        if (inn.bowler && Array.isArray(inn.bowler)) {
            for (const bowl of inn.bowler) {
                const perfId = `bowl_${inningsId}_${bowl.id}`;
                await run(
                    `INSERT OR REPLACE INTO match_bowling_performances 
                     (id, match_id, innings_id, cricbuzz_player_id, overs, maidens, runs_conceded, wickets, economy_rate, wides, no_balls)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        perfId, 
                        `m_${matchId}`, 
                        inningsId, 
                        String(bowl.id), 
                        bowl.overs || 0, 
                        bowl.maidens || 0, 
                        bowl.runs || 0, 
                        bowl.wickets || 0, 
                        bowl.economy || 0.0,
                        bowl.wides || 0,
                        bowl.no_balls || bowl.noBalls || 0
                    ]
                );
            }
        }
    }

    return { success: true, message: 'Scorecard ingested successfully' };
}

/**
 * Aggregates player stats from match_batting_performances / match_bowling_performances
 */
async function aggregatePlayerStats(cricbuzzPlayerId, starqPlayerId) {
    const battingMatches = await dbQuery(
        `SELECT * FROM match_batting_performances WHERE cricbuzz_player_id = ? OR player_id = ?`,
        [cricbuzzPlayerId, starqPlayerId]
    );

    let innings = 0, runs = 0, balls = 0, fours = 0, sixes = 0, highest = 0, notOuts = 0;
    
    battingMatches.forEach(b => {
        innings++;
        runs += b.runs;
        balls += b.balls_faced;
        fours += b.fours;
        sixes += b.sixes;
        if (b.runs > highest) highest = b.runs;
        if (b.how_out && b.how_out.toLowerCase().includes('not out')) {
            notOuts++;
        }
    });

    const average = (innings - notOuts) > 0 ? (runs / (innings - notOuts)) : runs;
    const strikeRate = balls > 0 ? (runs / balls) * 100 : 0;

    await run(
        `INSERT OR REPLACE INTO batting_stats (
            id, player_id, matches, innings, runs, balls_faced, highest_score, 
            batting_average, strike_rate, fours, sixes, not_outs
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            `b_${starqPlayerId}`, starqPlayerId, innings, innings, runs, balls, highest, 
            average, strikeRate, fours, sixes, notOuts
        ]
    );

    // Same for bowling stats
    const bowlingMatches = await dbQuery(
        `SELECT * FROM match_bowling_performances WHERE cricbuzz_player_id = ? OR player_id = ?`,
        [cricbuzzPlayerId, starqPlayerId]
    );

    let bowlInnings = 0, overs = 0, runsConceded = 0, wickets = 0, maidens = 0;
    
    bowlingMatches.forEach(b => {
        bowlInnings++;
        overs += b.overs;
        runsConceded += b.runs_conceded;
        wickets += b.wickets;
        maidens += b.maidens;
    });

    const economy = overs > 0 ? (runsConceded / overs) : 0;
    const bowlingAvg = wickets > 0 ? (runsConceded / wickets) : 0;

    await run(
        `INSERT OR REPLACE INTO bowling_stats (
            id, player_id, matches, innings, overs, maidens, runs_conceded, wickets, 
            economy_rate, bowling_average
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            `bw_${starqPlayerId}`, starqPlayerId, bowlInnings, bowlInnings, overs, maidens, runsConceded, wickets, 
            economy, bowlingAvg
        ]
    );

    return { success: true };
}

module.exports = {
    fetchFromApi,
    getScorecard,
    ingestScorecard,
    aggregatePlayerStats
};
