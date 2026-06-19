const axios = require("axios");

/* -----------------------------
   EXTRACT TOPICS FROM RESOURCE
------------------------------*/
const extractTopics = async (content) => {
  const prompt = `
Extract key learning topics from this study material.

Return ONLY JSON array of topics.

Content:
${content}
`;

  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You extract structured learning topics." },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
    }
  );

  try {
    return JSON.parse(response.data.choices[0].message.content);
  } catch {
    return [];
  }
};

/* -----------------------------
   GENERATE QUIZ FROM RESOURCE
------------------------------*/
const generateQuizFromResource = async (topics, difficulty) => {
  const prompt = `
Generate 5 MCQ questions.

Rules:
- Based ONLY on topics: ${topics.join(", ")}
- Difficulty: ${difficulty}
- 4 options each
- Include correctAnswer + topic

Return ONLY JSON array.
`;

  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You generate structured MCQ quizzes." },
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
  } catch {
    return [];
  }
};

module.exports = {
  extractTopics,
  generateQuizFromResource,
};