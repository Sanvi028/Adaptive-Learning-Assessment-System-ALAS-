import { useState } from "react";
import { askTutor } from "../api/aiTutor";

export default function AiTutor() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;

    try {
      setLoading(true);

      const data = await askTutor(question);

      // Adjust this if your backend returns a different property
      setAnswer(data.answer || data.response || JSON.stringify(data));
    } catch (error) {
      console.error(error);
      setAnswer("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-6">
        AI Tutor
      </h1>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask any study-related question..."
        rows={5}
        className="w-full border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <button
        onClick={handleAsk}
        disabled={loading}
        className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition"
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {answer && (
        <div className="mt-8 border rounded-lg p-6 bg-white shadow">
          <h2 className="text-xl font-semibold mb-3">
            AI Response
          </h2>

          <p className="whitespace-pre-wrap">
            {answer}
          </p>
        </div>
      )}

    </div>
  );
}