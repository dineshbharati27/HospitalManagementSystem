import React, { useState, useEffect } from "react";

const BookedAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch("http://localhost:5000/appointments");
      const data = await response.json();
      setAppointments(data.slice(0, 4)); // Display only 4 latest appointments
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
        Scheduled Appointments
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#e8f8f8] text-left">
              {["Patient Name", "Assigned Doctor", "Date", "Time"].map(
                (header, index) => (
                  <th
                    key={index}
                    className="p-3 text-gray-600 border-b border-gray-300 text-sm md:text-base"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr
                  key={appointment._id}
                  className="border-b border-gray-300 hover:bg-gray-100 transition"
                >
                  <td className="p-3 text-sm md:text-base">
                    {appointment.patientName}
                  </td>
                  <td className="p-3 text-sm md:text-base">
                    {appointment.assignedDoctor}
                  </td>
                  <td className="p-3 text-sm md:text-base">
                    {appointment.date}
                  </td>
                  <td className="p-3 text-sm md:text-base">
                    {appointment.time}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-3 text-center text-gray-500">
                  No Appointments Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookedAppointments;
