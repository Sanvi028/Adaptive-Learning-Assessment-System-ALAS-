const axios = require("axios");

async function generateExplanation({ question, correctAnswer, userAnswer, language = "en" }) {
  try {
    const prompt = `
You are an expert tutor.

Language: ${language}

Question: ${question}
Correct Answer: ${correctAnswer}
User Answer: ${userAnswer}

Task:
1. Explain why user answer is wrong (if wrong)
2. Give step-by-step reasoning
3. Be simple and educational
4. Keep response short and clear
5. Respond in ${language}

Return only explanation text.
`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ]
      }
    );

    return response.data.candidates[0].content.parts[0].text;

  } catch (error) {
    return `Correct answer is ${correctAnswer}. Review the concept again.`;
  }
}

module.exports = { generateExplanation };