import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", Appointments: 400, Patients: 240 },
  { name: "Feb", Appointments: 500, Patients: 350 },
  { name: "Mar", Appointments: 700, Patients: 450 },
  { name: "Apr", Appointments: 600, Patients: 400 },
];

const DashboardCharts = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full h-auto">
      {/* Title + Legend Container */}
      <div className="flex justify-between items-center mb-4 flex-wrap sm:flex-nowrap">
        {/* Title */}
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
          Hospital Statistics
        </h2>

        {/* Legend (Stacked on small screens) */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 text-sm sm:text-base font-semibold text-gray-700">
          <span className="flex items-center mb-1 sm:mb-0">
            <span className="w-4 h-4 bg-[#14B8A6] inline-block mr-1"></span>{" "}
            Appointments
          </span>
          <span className="flex items-center">
            <span className="w-4 h-4 bg-[#3B82F6] inline-block mr-1"></span>{" "}
            Patients
          </span>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="w-full h-[250px] sm:h-[350px] lg:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 10, left: -10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E6F4F1" />
            <XAxis dataKey="name" tick={{ fill: "#333", fontSize: 12 }} />
            <YAxis tick={{ fill: "#333", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#F8F9FA",
                borderColor: "#14B8A6",
              }}
            />
            <Bar dataKey="Appointments" fill="#14B8A6" barSize={30} />
            <Bar dataKey="Patients" fill="#3B82F6" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardCharts;
