import heroImage from "../assets/hero.png";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">

      <div className="grid md:grid-cols-2 gap-14 items-center">

        {/* Left Content */}
        <div className="animate-rise">

          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold mb-6">
            AI Powered Learning Platform
          </span>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-text">
            Learn Smarter.
            <br />
            Study Faster.
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-8 max-w-xl">
            Adaptive Study System helps students prepare using AI Tutor,
            personalized quizzes, analytics, study recommendations and
            intelligent learning assistance—all in one place.
          </p>

          <div className="mt-10 flex gap-5">

            <Link
              to="/dashboard"
              className="bg-primary text-white px-7 py-4 rounded-xl shadow-lg hover:scale-105 transition"
            >
              Get Started
            </Link>

            <button className="px-7 py-4 rounded-xl border border-primary text-primary hover:bg-primary hover:text-white transition">
              Learn More
            </button>

          </div>

        </div>

        {/* Right Image */}
        <div className="flex justify-center animate-float">

          <img
            src={heroImage}
            alt="AI Learning"
            className="w-full max-w-lg"
          />

        </div>

      </div>

    </section>
  );
}

export default Hero;