import {
  BookOpen,
  Brain,
  BarChart3,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: <Brain size={32} />,
    title: "AI Tutor",
    description:
      "Get instant explanations and personalized guidance powered by AI.",
  },
  {
    icon: <BookOpen size={32} />,
    title: "Smart Quizzes",
    description:
      "Practice adaptive quizzes that match your current knowledge level.",
  },
  {
    icon: <BarChart3 size={32} />,
    title: "Performance Analytics",
    description:
      "Track your progress with detailed insights and visual reports.",
  },
  {
    icon: <Sparkles size={32} />,
    title: "Resource Recommendations",
    description:
      "Receive personalized study resources based on your performance.",
  },
];

function Features() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-text">
          Everything You Need to Study Smarter
        </h2>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Our AI-powered platform combines personalized learning,
          intelligent tutoring, adaptive quizzes, and analytics to
          help you succeed.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        {features.map((feature, index) => (
          <div
            key={index}
            className="glass-panel rounded-3xl p-8 hover:-translate-y-2 transition duration-300"
          >
            <div className="text-primary mb-5">
              {feature.icon}
            </div>

            <h3 className="text-xl font-semibold mb-3">
              {feature.title}
            </h3>

            <p className="text-gray-600">
              {feature.description}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
}

export default Features;