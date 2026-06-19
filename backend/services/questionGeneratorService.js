const axios = require("axios");

const generateQuestionsFromResource = async ({
  topics,
  difficulty = "easy",
}) => {
  const prompt = `
Generate 5 MCQ questions.

Rules:
- Based ONLY on these topics: ${topics.join(", ")}
- Difficulty: ${difficulty}
- Each question must have:
  - questionText
  - options (array of 4)
  - correctAnswer
  - topic

Return ONLY valid JSON array.
No explanation. No markdown.
`;

  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You generate structured exam questions in JSON only." },
        { role: "user", content: prompt },
      ],
      temperature: 0.4,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
    }
  );

  try {
    return JSON.parse(response.data.choices[0].message.content);
  } catch (err) {
    console.log("AI JSON parse error:", response.data.choices[0].message.content);
    return [];
  }
};

module.exports = { generateQuestionsFromResource };