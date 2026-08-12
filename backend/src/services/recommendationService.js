const Program = require("../models/Program");
const Student = require("../models/Student");
const HttpError = require("../utils/httpError");
const { giveAIRecommendation } = require("./aiGenerateContent");
const { aiPrompt } = require("../utils/aiPrompt");
function calculateScore(student, program) {
  let score = 0;
  const reasons = [];
  if (student.targetCountries.includes(program.country)) {
    score += 35;
    reasons.push(`Preferred country match: ${program.country}`);
  }
  if (
    student.interestedFields.some((field) =>
      program.field.toLowerCase().includes(field.toLowerCase())
    )
  ) {
    score += 30;
    reasons.push(`Field alignment: ${program.field}`);
  }
  if (student.maxBudgetUsd >= program.tuitionFeeUsd) {
    score += 20;
    reasons.push("Within budget range");
  }
  if (student.preferredIntake && program.intakes.includes(student.preferredIntake)) {
    score += 10;
    reasons.push(`Preferred intake available: ${student.preferredIntake}`);
  }
  if ((student.englishTest?.score || 0) >= program.minimumIelts) {
    score += 5;
    reasons.push("English test score meets requirement");
  }
  return {
    score,
    reasons,
  };
}


async function buildProgramRecommendations(studentId) {
  const student = await Student.findById(studentId).lean();

  if (!student) {
    throw new HttpError(404, "Student not found.");
  }

  // 1. Fetch candidate programs matching target countries
  const candidatePrograms = await Program.find({
    country: { $in: student.targetCountries },
  })
    .limit(25)
    .lean();

  // 2. Score candidates using your deterministic algorithm
  const scoredPrograms = candidatePrograms
    .map((program) => {
      const { score, reasons } = calculateScore(student, program);
      return {
        ...program,
        matchScore: score,
        reasons,
      };
    })
    .sort((left, right) => right.matchScore - left.matchScore)
    .slice(0, 5); // Pick top 5 programs for Gemini evaluation

  // 3. Prompt Gemini for personalized analysis
  let aiRecommendation = null;
  try {
    const prompt = aiPrompt(student, scoredPrograms);
    aiRecommendation = await giveAIRecommendation(prompt);
  } catch (error) {
    console.error("Gemini AI Recommendation Error:", error.message);
    // Graceful fallback: Keep the rule-based response intact if AI fails
  }

  // 4. Merge AI insights into final output
  const finalRecommendations = scoredPrograms.map((program) => {
    const insight = aiRecommendation?.aiInsights?.find(
      (item) => String(item.programId) === String(program._id)
    );

    return {
      ...program,
      aiReason: insight?.aiReason || null,
    };
  });

  return {
    data: {
      student: {
        id: student._id,
        fullName: student.fullName,
        targetCountries: student.targetCountries,
        interestedFields: student.interestedFields,
      },
      aiSummary: aiRecommendation?.summary || null,
      topPick: aiRecommendation?.topPick || null,
      recommendations: finalRecommendations,
    },
    meta: {
      implementationStatus: "rule-based-scoring-enhanced-with-gemini-ai",
    },
  };
}
module.exports = {
  buildProgramRecommendations,
};
