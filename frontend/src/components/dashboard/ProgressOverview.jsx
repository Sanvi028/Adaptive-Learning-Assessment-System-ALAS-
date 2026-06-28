const stats = [
  {
    title: "Quizzes Completed",
    value: 12,
    icon: "📝",
    color: "text-blue-600",
  },
  {
    title: "Study Hours",
    value: "24h",
    icon: "⏳",
    color: "text-green-600",
  },
  {
    title: "AI Sessions",
    value: 18,
    icon: "🤖",
    color: "text-purple-600",
  },
  {
    title: "Resources Viewed",
    value: 35,
    icon: "📚",
    color: "text-orange-600",
  },
];

const ProgressOverview = () => {
  return (
    <div className="mt-8">
      <h2 className="mb-4 text-2xl font-bold text-text">
        Progress Overview
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.title}
            className="glass-panel rounded-2xl p-6 animate-rise"
          >
            <div className="flex items-center justify-between">
              <span className="text-3xl">{item.icon}</span>

              <span className={`text-3xl font-bold ${item.color}`}>
                {item.value}
              </span>
            </div>

            <p className="mt-4 text-gray-600">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressOverview;