import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 min-h-screen p-4">
      <div className="glass-panel h-full rounded-2xl p-4 flex flex-col gap-4">
        
        <h1 className="text-xl font-bold text-[#736ced]">
          Study AI
        </h1>

        <nav className="flex flex-col gap-3 mt-6">

          <Link className="hover:text-[#736ced]" to="/">
            Dashboard
          </Link>

          <Link className="hover:text-[#736ced]" to="/ai-tutor">
            AI Tutor
          </Link>

          <Link className="hover:text-[#736ced]" to="/quiz">
            Quiz
          </Link>

          <Link className="hover:text-[#736ced]" to="/analytics">
            Analytics
          </Link>

          <Link className="hover:text-[#736ced]" to="/resources">
            Resources
          </Link>

        </nav>

      </div>
    </div>
  );
}