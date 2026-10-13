import { CAREER_ROLES } from '../data/careersData';
import { AVAILABLE_SKILLS } from '../data/skillsData';

const LEVEL_MULTIPLIERS = {
  beginner: 0.75,
  intermediate: 0.9,
  advanced: 1.0
};

/**
 * Calculates career recommendations and match scores for a given set of student skills.
 * @param {Array<{id: string, level: string}>} userSkills
 * @returns {Array<Object>} Sorted list of recommended careers with match breakdown
 */
export function calculateRecommendations(userSkills = []) {
  const skillMap = new Map();
  userSkills.forEach(s => skillMap.set(s.id, s.level || 'intermediate'));

  return CAREER_ROLES.map(role => {
    // Required skills calculation
    let requiredScore = 0;
    const requiredSkillsTotal = role.requiredSkills.length;
    const matchedRequired = [];
    const missingRequired = [];

    role.requiredSkills.forEach(skillId => {
      if (skillMap.has(skillId)) {
        const level = skillMap.get(skillId);
        const multiplier = LEVEL_MULTIPLIERS[level] || 0.8;
        requiredScore += multiplier;
        matchedRequired.push({
          id: skillId,
          level,
          isAlternate: false
        });
      } else {
        // Check if an alternate skill satisfies it (e.g. backend alternate languages)
        if (role.alternateRequiredSkills) {
          const alternateFound = role.alternateRequiredSkills.find(alt => skillMap.has(alt));
          if (alternateFound && !matchedRequired.find(m => m.id === alternateFound)) {
            const level = skillMap.get(alternateFound);
            requiredScore += (LEVEL_MULTIPLIERS[level] || 0.8);
            matchedRequired.push({
              id: alternateFound,
              level,
              isAlternate: true
            });
            return;
          }
        }
        missingRequired.push(skillId);
      }
    });

    // Bonus skills calculation
    let bonusScore = 0;
    const bonusTotal = (role.bonusSkills && role.bonusSkills.length) || 1;
    const matchedBonus = [];
    const missingBonus = [];

    if (role.bonusSkills) {
      role.bonusSkills.forEach(skillId => {
        if (skillMap.has(skillId)) {
          const level = skillMap.get(skillId);
          bonusScore += (LEVEL_MULTIPLIERS[level] || 0.8);
          matchedBonus.push({ id: skillId, level });
        } else {
          missingBonus.push(skillId);
        }
      });
    }

    // Weighting: 75% for required skills, 25% for bonus skills
    const reqPercentage = requiredSkillsTotal > 0 ? (requiredScore / requiredSkillsTotal) * 100 : 0;
    const bonusPercentage = bonusTotal > 0 ? (bonusScore / bonusTotal) * 100 : 0;

    let overallMatch = Math.round((reqPercentage * 0.75) + (bonusPercentage * 0.25));
    if (overallMatch > 100) overallMatch = 100;

    // Minimum baseline calculation if no skills match
    if (userSkills.length === 0) {
      overallMatch = 0;
    }

    let status = 'Exploratory';
    let statusColor = 'text-amber-400 bg-amber-400/10 border-amber-400/20';

    if (overallMatch >= 75) {
      status = 'Job Ready / Strong Candidate';
      statusColor = 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
    } else if (overallMatch >= 50) {
      status = 'Intermediate Contender';
      statusColor = 'text-purple-400 bg-purple-400/10 border-purple-400/20';
    } else if (overallMatch >= 25) {
      status = 'Building Foundation';
      statusColor = 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    }

    return {
      ...role,
      matchPercentage: overallMatch,
      status,
      statusColor,
      matchedRequiredCount: matchedRequired.length,
      totalRequiredCount: requiredSkillsTotal,
      matchedRequired,
      missingRequired,
      matchedBonus,
      missingBonus
    };
  }).sort((a, b) => b.matchPercentage - a.matchPercentage);
}

/**
 * Performs a comprehensive skill gap analysis for a chosen career.
 * @param {string} careerId
 * @param {Array<{id: string, level: string}>} userSkills
 */
export function analyzeSkillGap(careerId, userSkills = []) {
  const recommendations = calculateRecommendations(userSkills);
  const career = recommendations.find(c => c.id === careerId) || recommendations[0];

  const skillLookup = new Map(AVAILABLE_SKILLS.map(s => [s.id, s]));

  const skillsYouHave = [
    ...career.matchedRequired.map(item => ({
      ...skillLookup.get(item.id),
      level: item.level,
      isRequired: true,
      isAlternate: item.isAlternate
    })),
    ...career.matchedBonus.map(item => ({
      ...skillLookup.get(item.id),
      level: item.level,
      isRequired: false
    }))
  ].filter(s => s.name); // ensure valid skill object

  const skillsToLearn = [
    ...career.missingRequired.map(id => ({
      ...skillLookup.get(id),
      priority: 'High Priority (Core)',
      isRequired: true
    })),
    ...career.missingBonus.map(id => ({
      ...skillLookup.get(id),
      priority: 'Recommended (Bonus)',
      isRequired: false
    }))
  ].filter(s => s.name);

  return {
    career,
    matchPercentage: career.matchPercentage,
    skillsYouHave,
    skillsToLearn,
    acquiredCount: skillsYouHave.length,
    missingCount: skillsToLearn.length,
    readinessRatio: `${career.matchedRequiredCount}/${career.totalRequiredCount} Core Skills Mastered`
  };
}

/**
 * Calculates overall Student Job Readiness Score (0 - 100%)
 * based on highest matched career, skill diversity, and roadmap progress.
 */
export function calculateJobReadinessScore(userSkills = [], completedRoadmapCount = 0) {
  if (userSkills.length === 0) return 10;

  const recommendations = calculateRecommendations(userSkills);
  const topMatch = recommendations[0] ? recommendations[0].matchPercentage : 0;
  const secondaryMatch = recommendations[1] ? recommendations[1].matchPercentage : 0;

  // Breadth bonus (having >= 4 diverse skills adds up to 10 points)
  const breadthBonus = Math.min(10, userSkills.length * 2);

  // Practical roadmap checkpoints bonus (up to 15 points)
  const roadmapBonus = Math.min(15, completedRoadmapCount * 3);

  // Weighted formula: 65% top career match + 10% secondary career match + breadth + roadmap
  let score = Math.round((topMatch * 0.65) + (secondaryMatch * 0.10) + breadthBonus + roadmapBonus);
  return Math.min(98, Math.max(12, score));
}
