function Features() {
  const features = [
    {
      title: "AI Tutor",
      description:
        "Get personalized explanations and instant doubt solving powered by AI.",
      icon: "🤖",
    },
    {
      title: "Adaptive Quizzes",
      description:
        "Questions automatically adjust to your learning level.",
      icon: "📝",
    },
    {
      title: "Analytics",
      description:
        "Track strengths, weaknesses, and monitor learning progress.",
      icon: "📊",
    },
    {
      title: "Smart Resources",
      description:
        "Receive AI-recommended study materials based on your performance.",
      icon: "📚",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-text">
            Everything You Need to Learn Better
          </h2>

          <p className="mt-4 text-gray-600">
            One platform combining AI tutoring, quizzes, analytics,
            and personalized recommendations.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="glass-panel rounded-2xl p-8 transition hover:-translate-y-2"
            >
              <div className="mb-5 text-5xl">{feature.icon}</div>

              <h3 className="mb-3 text-xl font-semibold">
                {feature.title}
              </h3>

              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;