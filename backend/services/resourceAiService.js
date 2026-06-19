const axios = require("axios");

const extractTopicsFromResource = async (content) => {
  const prompt = `
You are an AI tutor.

Extract structured learning topics from this study material.

Return ONLY JSON:

{
  "topics": [],
  "subtopics": [],
  "difficultyAreas": []
}

CONTENT:
${content}
`;

  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You extract structured learning data." },
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

  return response.data.choices[0].message.content;
};

module.exports = { extractTopicsFromResource };