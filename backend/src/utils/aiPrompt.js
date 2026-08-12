function aiPrompt(student, scoredPrograms) {
    const prompt = `
You are an expert study-abroad educational counsellor.
Analyze the following student profile and the top pre-matched academic programs.

Student Profile:
- Name: ${student.fullName}
- Target Countries: ${JSON.stringify(student.targetCountries)}
- Interested Fields: ${JSON.stringify(student.interestedFields)}
- Max Budget (USD): $${student.maxBudgetUsd || "Not specified"}
- IELTS Score: ${student.englishTest?.score || "N/A"}
- Preferred Intake: ${student.preferredIntake || "Flexible"}

Top Pre-Matched Programs:
${JSON.stringify(
        scoredPrograms.map((p) => ({
            id: p._id,
            title: p.title || p.name,
            university: p.university,
            country: p.country,
            field: p.field,
            tuitionFeeUsd: p.tuitionFeeUsd,
            matchScore: p.matchScore,
            ruleBasedReasons: p.reasons,
        })),
        null,
        2
    )}

Provide a structured JSON response containing:
1. "summary": A 2-3 sentence personalized summary for the student.
2. "topPick": The ID of the single best program for them and a 1-sentence reason why.
3. "aiInsights": An array of object mappings with "programId" and "aiReason" explaining why each program fits their specific career path or budget.

Return ONLY valid raw JSON with no Markdown wrappers.
`;
    return prompt;
}

module.exports = { aiPrompt };