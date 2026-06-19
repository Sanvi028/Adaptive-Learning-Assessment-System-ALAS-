const axios = require("axios");

const generateExplanation = async ({
  question,
  correctAnswer,
  userAnswer,
}) => {
  try {
    const prompt = `
You are an expert AI tutor.

Question: ${question}
Correct Answer: ${correctAnswer}
User Answer: ${userAnswer}

TASK:
1. Explain why user's answer is wrong (if wrong)
2. Give correct reasoning step-by-step
3. Use simple real-life analogy
4. Be short, clear, and educational
5. Be encouraging, not harsh
`;

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are a strict but friendly AI tutor.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.6,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    return `Correct answer is ${correctAnswer}. Review the concept again.`;
  }
};

module.exports = { generateExplanation };