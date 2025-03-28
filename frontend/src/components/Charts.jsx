import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", Appointments: 400, Patients: 240 },
  { name: "Feb", Appointments: 500, Patients: 350 },
  { name: "Mar", Appointments: 700, Patients: 450 },
  { name: "Apr", Appointments: 600, Patients: 400 },
];

const Charts = () => {
  return (
    <div className="w-full h-screen p-6 bg-white flex flex-col justify-center items-center">
      {/* Title Centered */}
      <h2 className="text-3xl font-bold mb-4 text-gray-900 text-center">Hospital Statistics</h2>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E6F4F1" />
          <XAxis dataKey="name" tick={{ fill: "#333", fontSize: 14 }} />
          <YAxis tick={{ fill: "#333", fontSize: 14 }} />
          <Tooltip contentStyle={{ backgroundColor: "#F8F9FA", borderColor: "#14B8A6" }} />
          <Legend verticalAlign="top" align="right" />
          <Bar dataKey="Appointments" fill="#14B8A6" barSize={50} />
          <Bar dataKey="Patients" fill="#3B82F6" barSize={50} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;

