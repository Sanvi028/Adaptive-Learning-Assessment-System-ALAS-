const axios = require("axios");

async function generateAIQuestions(topic) {
  try {
    const prompt = `
Generate 3 MCQ questions on ${topic}.

Return ONLY valid JSON array:
[
  {
    "questionText": "",
    "options": ["A","B","C","D"],
    "correctAnswer": "",
    "explanation": ""
  }
]
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

    const text = response.data.candidates[0].content.parts[0].text;

    const start = text.indexOf("[");
    const end = text.lastIndexOf("]") + 1;

    const json = text.slice(start, end);

    try {
  return JSON.parse(json);
} catch (e) {
  console.log("JSON parse failed, using fallback");
  return [];
}

    if (!text.includes("[")) {
  throw new Error("Invalid AI response format");
}

  } catch (error) {
    console.log("⚠️ AI failed, using fallback");

    return [
      {
        questionText: `Fallback question on ${topic}`,
        options: ["A", "B", "C", "D"],
        correctAnswer: "A",
        explanation: "Fallback explanation"
      }
    ];
  }
}

module.exports = { generateAIQuestions };