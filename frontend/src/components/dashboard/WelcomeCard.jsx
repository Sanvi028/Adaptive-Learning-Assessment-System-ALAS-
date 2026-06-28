const WelcomeCard = () => {
  // Temporary dummy data
  const user = {
    name: "Rahul",
    streak: 7,
    goal: "Complete 2 quizzes",
  };

  const hour = new Date().getHours();

  let greeting = "Hello";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  return (
    <div className="glass-panel animate-rise rounded-3xl p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {greeting} 👋
          </p>

          <h1 className="mt-2 text-4xl font-bold text-text">
            {user.name}
          </h1>

          <p className="mt-3 max-w-xl text-gray-600">
            Welcome back to your Adaptive Study System.
            Stay consistent, keep learning, and improve every day.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-white/70 p-5 shadow">
            <p className="text-sm text-gray-500">
              🔥 Study Streak
            </p>

            <h2 className="mt-2 text-3xl font-bold text-primary">
              {user.streak} Days
            </h2>
          </div>

          <div className="rounded-2xl bg-white/70 p-5 shadow">
            <p className="text-sm text-gray-500">
              🎯 Today's Goal
            </p>

            <h2 className="mt-2 text-lg font-semibold text-text">
              {user.goal}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;