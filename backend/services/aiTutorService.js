const Groq = require("groq-sdk");
const UserPerformance = require("../models/UserPerformance");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const askTutor = async (userId, question) => {
  // Fetch performance data
  const performance = await UserPerformance.find({ userId });

  // Detect weak topics
  const weakTopics = performance
    .filter((p) => p.accuracy < 60)
    .map((p) => p.topic);

  const prompt = `
You are ALAS AI Tutor.

Student Weak Topics:
${weakTopics.length ? weakTopics.join(", ") : "None"}

Student Question:
${question}

Instructions:
- Explain like a personal tutor.
- Use beginner-friendly language.
- Give examples when possible.
- Keep the explanation structured.
- If relevant, connect the explanation to the student's weak topics.
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content:
          "You are an adaptive AI tutor helping engineering students learn effectively.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return {
    weakTopics,
    answer: completion.choices[0].message.content,
  };
};

module.exports = {
  askTutor,
};