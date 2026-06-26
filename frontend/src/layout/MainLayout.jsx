import Sidebar from "../components/Sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="page-shell min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        <div className="glass-panel min-h-[90vh] rounded-2xl p-6 animate-rise">
          {children}
        </div>
      </div>
    </div>
  );
}