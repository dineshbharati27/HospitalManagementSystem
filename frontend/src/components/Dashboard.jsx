import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCards from "./DashboardCards";
import BookedAppointments from "./BookedAppointments";
import Charts from "./Charts";
import DashboardCharts from "./DashboardChart";

const Dashboard = () => {
  return (
    <>
      <div className="h-screen flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />

          {/* ✅ Fix: Prevent Horizontal Scrolling */}
          <div className="flex-1 p-6 bg-gray-100 md:ml-64 ml-0 mt-16 w-full overflow-x-hidden">
            <DashboardCards />

            <div className="mt-12">
              <BookedAppointments />
            </div>

            <div className="mt-12">
              <DashboardCharts/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
