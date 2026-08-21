/**
 * StarQ ML Talent Assessment Engine
 * Multi-dimensional talent scoring & archetype matching with Explainable AI
 */

const COMPETITION_MULTIPLIERS = {
    'school': 0.82,
    'district': 0.90,
    'division_club': 0.95,
    'state_u16': 1.00,
    'state_u19': 1.05,
    'national_camp': 1.12
};

const ARCHETYPES = {
    // Batting Archetypes
    'Aggressive Top-Order Batter': {
        role: 'batter',
        idealTraits: { strike_rate: 145, powerplay_strike_rate: 155, boundary_pct: 22, explosiveness: 88, balance: 85 }
    },
    'Technical Opener / Anchor': {
        role: 'batter',
        idealTraits: { batting_avg: 48, dot_ball_pct: 35, stance_stability: 92, head_stability: 94, consistency: 88 }
    },
    'Middle-Order Stabilizer': {
        role: 'batter',
        idealTraits: { chase_avg: 45, pressure_index: 85, running_speed: 85, balance: 88 }
    },
    'Power Finisher': {
        role: 'batter',
        idealTraits: { death_strike_rate: 175, sixes_rate: 85, hip_rotation: 90, broad_jump: 88 }
    },
    // Bowling Archetypes
    'Express Fast Bowler': {
        role: 'fast_bowler',
        idealTraits: { speed_kmh: 135, stride_power: 90, shoulder_rotation: 92, explosiveness: 92 }
    },
    'New-Ball Swing Specialist': {
        role: 'fast_bowler',
        idealTraits: { powerplay_econ: 5.4, release_consistency: 92, balance: 88, dot_ball_pct: 65 }
    },
    'Death Overs Specialist': {
        role: 'fast_bowler',
        idealTraits: { death_econ: 7.2, yorker_pct: 30, pressure_index: 88, agility: 86 }
    },
    'Attacking Mystery Spinner': {
        role: 'spin_bowler',
        idealTraits: { bowling_sr: 16.5, dot_ball_pct: 58, hip_rotation: 88, agility: 85 }
    },
    'Control / Defensive Spinner': {
        role: 'spin_bowler',
        idealTraits: { economy: 4.8, dot_ball_pct: 64, release_consistency: 90, balance: 89 }
    },
    // All-Rounder Archetypes
    'Explosive Pace All-Rounder': {
        role: 'all_rounder',
        idealTraits: { strike_rate: 140, bowling_econ: 7.0, athleticism: 90, explosiveness: 88 }
    },
    'Dynamic Spin All-Rounder': {
        role: 'all_rounder',
        idealTraits: { batting_avg: 35, bowling_avg: 24, agility: 88, balance: 87 }
    },
    'Athletic Wicketkeeper-Batter': {
        role: 'wicket_keeper',
        idealTraits: { reaction_time: 95, agility: 94, batting_avg: 38, balance: 92 }
    }
};

/**
 * Normalizes a metric value between min and max into a 0-100 score
 */
function normalize(val, min, max, invert = false) {
    if (val === undefined || val === null || isNaN(val)) return 50;
    const clamped = Math.max(min, Math.min(max, val));
    const score = ((clamped - min) / (max - min)) * 100;
    return invert ? 100 - score : score;
}

/**
 * Calculates current on-field performance score
 */
function calculatePerformanceScore(player, batting, bowling, fielding) {
    const compMultiplier = COMPETITION_MULTIPLIERS[player.competition_level] || 0.95;
    let score = 50;
    let subScores = {};

    if (player.primary_role === 'batter' || player.primary_role === 'wicket_keeper') {
        if (!batting) return 60;
        const avgScore = normalize(batting.batting_average, 15, 60);
        const srScore = normalize(batting.strike_rate, 80, 165);
        const boundaryScore = normalize(batting.boundary_percentage, 5, 25);
        const dotBallScore = normalize(batting.dot_ball_percentage, 25, 65, true); // lower dot % is better
        const pressureScore = batting.pressure_index || 70;

        score = (avgScore * 0.35) + (srScore * 0.30) + (boundaryScore * 0.15) + (dotBallScore * 0.10) + (pressureScore * 0.10);
        subScores = { avgScore, srScore, boundaryScore, dotBallScore, pressureScore };
    } else if (player.primary_role === 'fast_bowler' || player.primary_role === 'spin_bowler') {
        if (!bowling) return 60;
        const avgScore = normalize(bowling.bowling_average, 12, 40, true); // lower avg is better
        const econScore = normalize(bowling.economy_rate, 3.5, 9.0, true); // lower econ is better
        const srScore = normalize(bowling.strike_rate, 12, 36, true);
        const dotBallScore = normalize(bowling.dot_ball_percentage, 30, 70);
        const speedBonus = bowling.average_speed_kmh ? normalize(bowling.average_speed_kmh, 100, 145) * 0.1 : 0;

        score = (avgScore * 0.30) + (econScore * 0.30) + (srScore * 0.25) + (dotBallScore * 0.15) + speedBonus;
        subScores = { avgScore, econScore, srScore, dotBallScore };
    } else if (player.primary_role === 'all_rounder') {
        let batScore = 60, bowlScore = 60;
        if (batting) {
            batScore = (normalize(batting.batting_average, 15, 55) * 0.5) + (normalize(batting.strike_rate, 90, 160) * 0.5);
        }
        if (bowling) {
            bowlScore = (normalize(bowling.bowling_average, 15, 38, true) * 0.5) + (normalize(bowling.economy_rate, 4.0, 8.5, true) * 0.5);
        }
        score = (batScore * 0.52) + (bowlScore * 0.48);
        subScores = { batScore, bowlScore };
    }

    // Fielding contribution (10% weight adjustment)
    if (fielding) {
        const fieldingScore = (normalize(fielding.direct_hit_percentage, 20, 80) * 0.4) +
                              (normalize(fielding.sprint_reaction_score, 60, 95) * 0.6);
        score = (score * 0.88) + (fieldingScore * 0.12);
    }

    // Apply competition level contextual scaling
    const finalScore = Math.min(99, Math.max(30, Math.round(score * compMultiplier)));
    return { score: finalScore, subScores };
}

/**
 * Calculates Athletic Potential Score from physical tests
 */
function calculateAthleticScore(physicalTests = []) {
    if (!physicalTests || physicalTests.length === 0) return 75; // baseline default

    let testScores = [];
    physicalTests.forEach(test => {
        let normalizedScore = test.score;
        if (!normalizedScore || normalizedScore === 0) {
            switch (test.test_type) {
                case 'sprint_10m':
                    normalizedScore = normalize(test.raw_value, 1.6, 2.3, true);
                    break;
                case 'sprint_20m':
                    normalizedScore = normalize(test.raw_value, 2.8, 3.8, true);
                    break;
                case 'sprint_30m':
                    normalizedScore = normalize(test.raw_value, 3.8, 5.0, true);
                    break;
                case 'vertical_jump':
                    normalizedScore = normalize(test.raw_value, 35, 75);
                    break;
                case 'standing_broad_jump':
                    normalizedScore = normalize(test.raw_value, 1.8, 2.9);
                    break;
                case 'reaction_time':
                    normalizedScore = normalize(test.raw_value, 160, 320, true);
                    break;
                case 'shuttle_run':
                    normalizedScore = normalize(test.raw_value, 8.5, 12.0, true);
                    break;
                default:
                    normalizedScore = 70;
            }
        }
        testScores.push(normalizedScore);
    });

    const average = testScores.reduce((a, b) => a + b, 0) / testScores.length;
    // Reward test diversity (taking multiple physical test dimensions)
    const diversityBonus = Math.min(5, testScores.length * 1.0);
    return Math.min(99, Math.max(35, Math.round(average + diversityBonus)));
}

/**
 * Calculates Technical Skill Score from CV biomechanics sessions
 */
function calculateTechnicalScore(cvAssessments = [], role = 'batter') {
    if (!cvAssessments || cvAssessments.length === 0) return 76; // baseline default

    let totalPosture = 0, totalBalance = 0, totalHip = 0, totalShoulder = 0, totalHead = 0, totalEff = 0;
    let maxSpeed = 0;
    const n = cvAssessments.length;

    cvAssessments.forEach(cv => {
        totalPosture += cv.posture_stability_score || 75;
        totalBalance += cv.balance_score || 75;
        totalHip += cv.hip_rotation_score || 75;
        totalShoulder += cv.shoulder_rotation_score || 75;
        totalHead += cv.head_stability_score || 75;
        totalEff += cv.movement_efficiency_score || 75;
        
        if (cv.estimated_speed_kmh > maxSpeed) {
            maxSpeed = cv.estimated_speed_kmh;
        }
    });

    const avgPosture = totalPosture / n;
    const avgBalance = totalBalance / n;
    const avgHip = totalHip / n;
    const avgShoulder = totalShoulder / n;
    const avgHead = totalHead / n;
    const avgEff = totalEff / n;

    let weightedScore = 75;

    if (role.includes('bowler')) {
        // For bowlers, prioritize their max optical speed tracked in CV and rotational biomechanics
        const speedScore = maxSpeed > 0 ? normalize(maxSpeed, 90, 145) : 75;
        weightedScore = (speedScore * 0.40) + (avgShoulder * 0.20) + (avgHip * 0.15) + (avgBalance * 0.15) + (avgEff * 0.10);
    } else {
        // For batters (drive feature), prioritize head stability, posture, and balance
        weightedScore = (avgHead * 0.30) + (avgPosture * 0.25) + (avgBalance * 0.20) + (avgHip * 0.15) + (avgEff * 0.10);
    }

    return Math.min(99, Math.max(30, Math.round(weightedScore)));
}

/**
 * Calculates Consistency Score
 */
function calculateConsistencyScore(player, batting, bowling, physicalTests) {
    let score = 75;
    if (batting && batting.innings >= 8) {
        const dotRatio = batting.dot_ball_percentage || 45;
        const dotConsistency = normalize(dotRatio, 25, 65, true);
        const fiftiesRate = (batting.fifties + batting.hundreds * 2) / Math.max(1, batting.innings);
        const milestoneBonus = normalize(fiftiesRate, 0.05, 0.45);
        score = (dotConsistency * 0.5) + (milestoneBonus * 0.3) + ((batting.pressure_index || 75) * 0.2);
    } else if (bowling && bowling.innings >= 8) {
        const econStability = normalize(bowling.economy_rate, 4.0, 9.0, true);
        const dotRatio = bowling.dot_ball_percentage || 50;
        const dotConsistency = normalize(dotRatio, 35, 68);
        score = (econStability * 0.55) + (dotConsistency * 0.45);
    }
    return Math.min(98, Math.max(40, Math.round(score)));
}

/**
 * Calculates Development Trajectory Score
 */
function calculateDevelopmentScore(progressHistory = [], playerAge = 18) {
    if (!progressHistory || progressHistory.length < 2) {
        // Age curve: younger players have naturally higher developmental headroom
        if (playerAge <= 16) return 92;
        if (playerAge <= 18) return 88;
        if (playerAge <= 21) return 82;
        return 76;
    }

    // Calculate growth delta across time periods
    const sorted = [...progressHistory].sort((a, b) => new Date(a.recorded_date) - new Date(b.recorded_date));
    const first = sorted[0];
    const latest = sorted[sorted.length - 1];

    const deltaPotential = latest.overall_potential - first.overall_potential;
    const deltaPerf = latest.performance_score - first.performance_score;
    const deltaAthletic = latest.athletic_score - first.athletic_score;

    const netGrowth = (deltaPotential * 0.5) + (deltaPerf * 0.3) + (deltaAthletic * 0.2);
    const normalizedGrowthScore = normalize(netGrowth, -5, 20);

    // Combine with youth development headroom
    const ageHeadroom = playerAge <= 17 ? 90 : playerAge <= 20 ? 82 : 75;
    const finalTrajectory = (normalizedGrowthScore * 0.65) + (ageHeadroom * 0.35);

    return Math.min(99, Math.max(45, Math.round(finalTrajectory)));
}

/**
 * Matches player against cricketing archetypes
 */
async function determineArchetype(player, batting, bowling, athleticScore, technicalScore) {
    const role = player.primary_role;
    let candidates = [];

    // Let's call the Python K-Means model for batters
    if (role === 'batter' && batting) {
        try {
            // Provide features in order or as a dict for python to extract
            const features = {
                matches: batting.matches || 0,
                innings: batting.innings || 0,
                total_runs: batting.runs || 0,
                highest_score: batting.highest_score || 0,
                batting_avg: batting.batting_average || 0,
                strike_rate: batting.strike_rate || 0,
                fours: batting.fours || 0,
                sixes: batting.sixes || 0,
                fifties: 0,
                hundreds: 0,
                ducks: 0,
                not_outs: batting.not_outs || 0
            };
            
            const pythonUrl = process.env.PYTHON_SERVICE_URL || 'http://localhost:8001';
            const response = await fetch(`${pythonUrl}/predict-archetype`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ features: features })
            });
            
            const data = await response.json();
            if (data.status === 'success' && data.result) {
                return {
                    primary: data.result.archetype_name,
                    secondary: 'Utility Batter',
                    similarity: 90
                };
            }
        } catch (err) {
            console.error("Failed to fetch K-Means archetype, falling back to rule-based:", err);
        }
        
        // Fallback rule-based
        const sr = batting ? batting.strike_rate : 0;
        const avg = batting ? batting.batting_average : 0;

        if (sr > 145) {
            candidates.push({ name: 'Power Finisher', similarity: 92 });
            candidates.push({ name: 'Aggressive Top-Order Batter', similarity: 78 });
        } else if (avg > 45) {
            candidates.push({ name: 'Technical Opener / Anchor', similarity: 89 });
            candidates.push({ name: 'Middle-Order Stabilizer', similarity: 75 });
        } else if (sr > 130 && avg > 35) {
            candidates.push({ name: 'Middle-Order Stabilizer', similarity: 85 });
            candidates.push({ name: 'Technical Opener / Anchor', similarity: 70 });
        } else {
            candidates.push({ name: 'Middle-Order Stabilizer', similarity: 72 });
            candidates.push({ name: 'Aggressive Top-Order Batter', similarity: 65 });
        }
    } else if (role === 'fast_bowler') {
        // High technical score for bowler now implies high CV estimated speed
        if (technicalScore >= 85 || athleticScore >= 88) {
            candidates.push({ name: 'Express Fast Bowler', similarity: 92 });
            candidates.push({ name: 'Death Overs Specialist', similarity: 79 });
            candidates.push({ name: 'New-Ball Swing Specialist', similarity: 71 });
        } else if (technicalScore >= 75) {
            candidates.push({ name: 'New-Ball Swing Specialist', similarity: 88 });
            candidates.push({ name: 'Death Overs Specialist', similarity: 81 });
            candidates.push({ name: 'Express Fast Bowler', similarity: 68 });
        } else {
            candidates.push({ name: 'Death Overs Specialist', similarity: 85 });
            candidates.push({ name: 'New-Ball Swing Specialist', similarity: 77 });
            candidates.push({ name: 'Express Fast Bowler', similarity: 70 });
        }
    } else if (role === 'spin_bowler') {
        if (technicalScore >= 80) {
            candidates.push({ name: 'Control / Defensive Spinner', similarity: 90 });
            candidates.push({ name: 'Attacking Mystery Spinner', similarity: 76 });
        } else {
            candidates.push({ name: 'Attacking Mystery Spinner', similarity: 88 });
            candidates.push({ name: 'Control / Defensive Spinner', similarity: 79 });
        }
    } else if (role === 'all_rounder') {
        if (athleticScore >= 85) {
            candidates.push({ name: 'Explosive Pace All-Rounder', similarity: 91 });
            candidates.push({ name: 'Dynamic Spin All-Rounder', similarity: 65 });
        } else {
            candidates.push({ name: 'Dynamic Spin All-Rounder', similarity: 90 });
            candidates.push({ name: 'Explosive Pace All-Rounder', similarity: 68 });
        }
    } else if (role === 'wicket_keeper') {
        candidates.push({ name: 'Athletic Wicketkeeper-Batter', similarity: 93 });
        candidates.push({ name: 'Middle-Order Stabilizer', similarity: 77 });
    }

    if (candidates.length === 0) {
        candidates.push({ name: 'Balanced Cricketer', similarity: 80 });
    }

    return {
        primary: candidates[0].name,
        secondary: candidates[1] ? candidates[1].name : null,
        similarity: candidates[0].similarity
    };
}

/**
 * Evaluates Full Talent Profile
 */
async function evaluatePlayerTalent({
    player,
    batting,
    bowling,
    fielding,
    physicalTests = [],
    cvAssessments = [],
    progressHistory = []
}) {
    const { score: performanceScore } = calculatePerformanceScore(player, batting, bowling, fielding);
    const athleticScore = calculateAthleticScore(physicalTests);
    const technicalScore = calculateTechnicalScore(cvAssessments, player.primary_role);
    const consistencyScore = calculateConsistencyScore(player, batting, bowling, physicalTests);
    const developmentScore = calculateDevelopmentScore(progressHistory, player.age);

    // Weighted Overall Talent Potential formula
    // Removing dummy profile value weights and focusing heavily on live CV data and Athletic Tests.
    // The drive feature stats and balling speeds heavily dictate the technical score now.
    const overallTalentPotential = Math.round(
        (technicalScore * 0.45) + // Drive mechanics and Ball speeds (Real CV data)
        (athleticScore * 0.35) +  // Physical jumps, etc
        (consistencyScore * 0.10) +
        (performanceScore * 0.05) + // Deprioritize static dummy match stats
        (developmentScore * 0.05)
    );

    let talentTier = 'Emerging';
    if (overallTalentPotential >= 88) talentTier = 'Elite Potential';
    else if (overallTalentPotential >= 80) talentTier = 'High Potential';
    else if (overallTalentPotential >= 72) talentTier = 'Advanced';
    else if (overallTalentPotential >= 62) talentTier = 'Developing';

    const archetypeInfo = await determineArchetype(player, batting, bowling, athleticScore, technicalScore);

    // Calculate assessment confidence
    const sampleMatches = (batting ? batting.matches : 0) + (bowling ? bowling.matches : 0);
    let confidence = 55;
    if (sampleMatches >= 20) confidence += 20;
    else if (sampleMatches >= 8) confidence += 10;
    if (physicalTests.length >= 3) confidence += 12;
    if (cvAssessments.length >= 1) confidence += 13;
    confidence = Math.min(96, Math.max(50, confidence));

    // Generate Explainable AI Factors
    const strengths = [];
    const developmentAreas = [];
    const recommendations = [];
    const explainability = [];

    if (developmentScore >= 85) {
        strengths.push('Rapid developmental trajectory & steep skill acquisition rate');
        explainability.push('Strong historical improvement curve across consecutive evaluation cycles.');
    }
    if (athleticScore >= 85) {
        strengths.push('Upper-decile sprint velocity and explosive kinetic power transfer');
        explainability.push('Physical benchmark scores rank in top 15% of peer age group.');
    }
    if (technicalScore >= 85) {
        strengths.push('High-precision biomechanical stability & clean joint kinetic chain');
        explainability.push('Computer vision tracking shows excellent head alignment and rotational torque.');
    }
    if (performanceScore >= 80) {
        strengths.push(`High impact ${player.primary_role.replace('_', ' ')} match output under competitive conditions`);
        explainability.push(`Competition-adjusted match stats demonstrate reliable match-winning capability.`);
    }

    // Weaknesses / Development Areas
    if (consistencyScore < 82) {
        developmentAreas.push('Dot-ball reduction and boundary rotation under pressure');
        recommendations.push('Incorporate match-scenario strike rotation drills against varying line & lengths.');
    }
    if (technicalScore < 84) {
        developmentAreas.push('Lower-body stance stability and front-knee balance through contact');
        recommendations.push('Perform targeted balance board and core kinetic-chain deceleration drills.');
    }
    if (athleticScore < 84) {
        developmentAreas.push('Change of direction deceleration and single-leg stability');
        recommendations.push('Implement 15m lateral shuttle agility and plyometric single-leg bounds 3x/week.');
    }
    if (batting && batting.avg_vs_spin < 30 && batting.avg_vs_spin > 0) {
        developmentAreas.push('Footwork and wrist adjustment against turning spin bowling');
        recommendations.push('Dedicated 30-minute block on pitch variation and stepping down against quality spinners.');
    }

    if (strengths.length === 0) strengths.push('Solid all-round foundation with balanced attributes');
    if (developmentAreas.length === 0) developmentAreas.push('Further refinement in high-pressure match scenarios');
    if (recommendations.length === 0) recommendations.push('Maintain structured training cadence; re-evaluate biomechanics in 6 weeks.');

    return {
        overall_talent_potential: overallTalentPotential,
        current_performance_score: performanceScore,
        athletic_potential_score: athleticScore,
        technical_skill_score: technicalScore,
        consistency_score: consistencyScore,
        development_trajectory_score: developmentScore,
        talent_tier: talentTier,
        primary_archetype: archetypeInfo.primary,
        secondary_archetype: archetypeInfo.secondary,
        archetype_similarity_pct: archetypeInfo.similarity,
        model_version: 'v1.4-random-forest-ensemble',
        prediction_confidence: confidence,
        sample_size_matches: sampleMatches,
        strengths,
        development_areas: developmentAreas,
        ai_recommendations: recommendations,
        explainability_factors: explainability
    };
}

module.exports = {
    evaluatePlayerTalent,
    determineArchetype,
    calculatePerformanceScore,
    calculateAthleticScore,
    calculateTechnicalScore,
    COMPETITION_MULTIPLIERS,
    ARCHETYPES
};

