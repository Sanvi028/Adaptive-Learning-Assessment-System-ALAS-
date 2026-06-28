import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import AiTutor from "./pages/AiTutor";
import Quiz from "./pages/Quiz";
import Analytics from "./pages/Analytics";
import Resources from "./pages/Resources";

function LayoutWrapper({ Component }) {
  return (
    <MainLayout>
      <Component />
    </MainLayout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="page-shell">
        <Routes>

          <Route path="/" element={<LandingPage />} />

          <Route path="/dashboard" element={<LayoutWrapper Component={Dashboard} />} />
          <Route path="/ai-tutor" element={<LayoutWrapper Component={AiTutor} />} />
          <Route path="/quiz" element={<LayoutWrapper Component={Quiz} />} />
          <Route path="/analytics" element={<LayoutWrapper Component={Analytics} />} />
          <Route path="/resources" element={<LayoutWrapper Component={Resources} />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}