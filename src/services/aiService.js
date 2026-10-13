import { calculateRecommendations, analyzeSkillGap } from './recommendationEngine';

/**
 * Service to generate AI Career Insights.
 * Ready for live Gemini / OpenAI API integration with graceful mock generation.
 */
export const aiService = {
  /**
   * Generates a tailored AI analysis for the student's current profile.
   * @param {Array} userSkills
   * @param {string} targetCareerId
   * @param {string} apiKey (optional for future integration)
   * @returns {Promise<Object>} Structured AI recommendation insight
   */
  async generateCareerAdvice(userSkills, targetCareerId, apiKey = null) {
    // Simulate brief network latency for realistic feel
    await new Promise(resolve => setTimeout(resolve, 600));

    const recommendations = calculateRecommendations(userSkills);
    const gapAnalysis = analyzeSkillGap(targetCareerId, userSkills);
    const target = gapAnalysis.career;

    const skillNames = userSkills.map(s => s.id.toUpperCase()).join(', ');
    const missingNames = gapAnalysis.skillsToLearn.map(s => s.name).join(', ');

    // Realistic, intelligent dynamic mock synthesis
    const mockInsight = {
      model: 'SkillBridge-Reasoning-v1 (Ready for Gemini/OpenAI API)',
      timestamp: new Date().toLocaleTimeString(),
      summary: `Based on your technical footprint in [${skillNames || 'None yet'}], you have a solid trajectory toward ${target.title}. You currently meet ${target.matchPercentage}% of industry requirements for entry-level positions.`,
      strengths: userSkills.length > 0
        ? `Strong foundational grasp in ${userSkills.slice(0, 3).map(s => s.id).join(', ')}, demonstrating modern developer aptitude.`
        : 'Starting fresh gives you the agility to pick high-demand modern stacks without legacy tech debt.',
      criticalGaps: gapAnalysis.skillsToLearn.length > 0
        ? `Focus your upcoming 30 days on mastering: ${missingNames}.`
        : 'You possess all primary required skills! Shift your efforts to deploying complex full-stack portfolio apps.',
      actionPlan: [
        `Complete the ${target.title} roadmap Phase 1 & 2 milestone projects.`,
        `Practice relational queries and data structure problem solving twice a week.`,
        `Package 2 repositories with production-grade READMEs and live deployment URLs.`
      ],
      aiConfidence: target.matchPercentage >= 70 ? 'High' : target.matchPercentage >= 40 ? 'Moderate' : 'Developing'
    };

    return mockInsight;
  }
};
