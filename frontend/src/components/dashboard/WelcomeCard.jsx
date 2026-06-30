function WelcomeCard() {
  return (
    <div className="glass-panel rounded-3xl p-8 animate-rise">

      <h1 className="text-4xl font-bold text-text">
        Welcome Back 👋
      </h1>

      <p className="mt-3 text-gray-600">
        Continue your learning journey with AI-powered study tools.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">

        <button className="bg-primary text-white px-6 py-3 rounded-xl hover:scale-105 transition">
          Start Quiz
        </button>

        <button className="border border-primary text-primary px-6 py-3 rounded-xl hover:bg-primary hover:text-white transition">
          Ask AI Tutor
        </button>

      </div>

    </div>
  );
}

export default WelcomeCard;