import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full px-8 py-5 flex items-center justify-between bg-white/70 backdrop-blur-md border-b border-gray-200">

      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-bold text-primary"
      >
        Adaptive Study
      </Link>

      {/* Navigation */}
      <div className="flex items-center gap-8 text-gray-700 font-medium">

        <Link
          to="/"
          className="hover:text-primary transition"
        >
          Home
        </Link>

        <Link
          to="/dashboard"
          className="hover:text-primary transition"
        >
          Dashboard
        </Link>

        <Link
          to="/ai-tutor"
          className="hover:text-primary transition"
        >
          AI Tutor
        </Link>

        <Link
          to="/quiz"
          className="hover:text-primary transition"
        >
          Quiz
        </Link>

        <Link
          to="/analytics"
          className="hover:text-primary transition"
        >
          Analytics
        </Link>

        <Link
          to="/resources"
          className="hover:text-primary transition"
        >
          Resources
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;