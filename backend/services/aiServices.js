const UserPerformance = require("../models/UserPerformance");
const axios = require("axios");

/* -----------------------------
   PERFORMANCE ANALYSIS
------------------------------*/
const analyzePerformance = (performanceData) => {
  if (!performanceData || performanceData.length === 0) {
    return { weakTopics: [], strongTopics: [] };
  }

  const weakTopics = [];
  const strongTopics = [];

  performanceData.forEach((item) => {
    const accuracy =
      item.totalQuestions > 0
        ? (item.correctAnswers / item.totalQuestions) * 100
        : 0;

    const topicData = {
      topic: item.topic,
      accuracy: Number(accuracy.toFixed(2)),
    };

    if (accuracy < 60) weakTopics.push(topicData);
    else strongTopics.push(topicData);
  });

  return { weakTopics, strongTopics };
};

/* -----------------------------
   LEARNING TREND
------------------------------*/
const analyzeLearningTrend = (performanceData) => {
  if (!performanceData || performanceData.length === 0) {
    return "no-data";
  }

  const avgAccuracy =
    performanceData.reduce((sum, item) => {
      const acc =
        item.totalQuestions > 0
          ? (item.correctAnswers / item.totalQuestions) * 100
          : 0;
      return sum + acc;
    }, 0) / performanceData.length;

  if (avgAccuracy > 75) return "improving";
  if (avgAccuracy < 50) return "declining";
  return "stable";
};

/* -----------------------------
   PROMPT ENGINE
------------------------------*/
const buildAdaptivePrompt = ({
  weakTopics,
  strongTopics,
  trend,
  userQuestion,
}) => {
  return `
You are an expert AI Tutor in an Adaptive Learning System (ALAS).

STUDENT PROFILE:

Weak Topics:
${
    weakTopics.length
      ? weakTopics.map((t) => `- ${t.topic} (${t.accuracy}%)`).join("\n")
      : "None"
  }

Strong Topics:
${
    strongTopics.length
      ? strongTopics.map((t) => `- ${t.topic} (${t.accuracy}%)`).join("\n")
      : "None"
  }

Learning Trend: ${trend}

QUESTION:
${userQuestion}

RULES:
- Weak topic → simple explanation
- Strong topic → deeper explanation
- Declining → simplify
- Improving → increase difficulty slightly

Return structured explanation with examples.
`;
};

/* -----------------------------
   GROQ API CALL
------------------------------*/
const callGroqAPI = async (prompt) => {
  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You are an expert AI tutor." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].message.content;
};

/* -----------------------------
   MAIN FUNCTION
------------------------------*/
const generateTutorResponse = async (userId, userQuestion) => {
  try {
    const performanceData = await UserPerformance.find({ userId });

    if (!performanceData || performanceData.length === 0) {
      return {
        weakTopics: [],
        strongTopics: [],
        trend: "no-data",
        answer: "No data found. Attempt quizzes first.",
      };
    }

    const { weakTopics, strongTopics } =
      analyzePerformance(performanceData);

    const trend = analyzeLearningTrend(performanceData);

    const prompt = buildAdaptivePrompt({
      weakTopics,
      strongTopics,
      trend,
      userQuestion,
    });

    const answer = await callGroqAPI(prompt);

    return {
      weakTopics,
      strongTopics,
      trend,
      answer,
    };
  } catch (error) {
    return {
      weakTopics: [],
      strongTopics: [],
      trend: "error",
      answer: "AI Tutor failed. Try again later.",
    };
  }
};

module.exports = {
  generateTutorResponse,
};