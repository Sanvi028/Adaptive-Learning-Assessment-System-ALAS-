import WelcomeCard from "../components/dashboard/WelcomeCard";

const Dashboard = () => {
  return (
    <div className="page-shell min-h-screen p-6">
      <div className="mx-auto max-w-7xl">
        <WelcomeCard />
      </div>
    </div>
  );
};

export default Dashboard;