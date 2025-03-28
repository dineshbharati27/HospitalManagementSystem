import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios"; // Import axios
import { FaSearch, FaPlus, FaBars } from "react-icons/fa";

const Patient = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [patients, setPatients] = useState([]);
  Array(50).fill(null).map((_, index) => ({
    id: index + 1,
    name: "Patient " + (index + 1),
    age: 20 + (index % 5),
    gender: index % 2 === 0 ? "Male" : "Female",
    appointment: "2024-08-13 08:30",
    doctorAssigned: "Dr. Smith"
  }))

  const [showForm, setShowForm] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "Male",
    appointment: "",
    doctorAssigned: "",
  });

  const itemsPerPage = 8;

  // Fetch patients from the backend
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:5000/patients"); // Adjust the endpoint as per your backend
        const patientsData = response.data.map((p, index) => ({
          ...p,
          id: p.id || index + 1, // Ensure each patient has an ID
        }));
        setPatients(patientsData);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, []);

  // Filter and paginate patients
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPatients = filteredPatients.reverse().slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleAddNew = () => {
    setShowForm(true);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Handle form submission to add a new patient
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newId = patients.length > 0 ? Math.max(...patients.map(p => p.id)) + 1 : 1; // Generate sequential ID
      const newPatientWithId = { ...newPatient, id: newId };

      const response = await axios.post("http://localhost:5000/patients", newPatientWithId);
      setPatients([...patients, response.data]); // Add new patient to state

      setShowForm(false);
      setNewPatient({ name: "", age: "", gender: "Male", appointment: "", doctorAssigned: "" });
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Navbar />
      
      {/* Sidebar Toggle for Mobile */}
      <button
        className="md:hidden p-4 text-gray-700"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <FaBars className="text-2xl" />
      </button>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar with responsive toggle */}
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-white shadow-md transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform md:relative md:translate-x-0`}
        >
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="flex-1 p-3 bg-gray-100">
          <div className="bg-white rounded-xl shadow-lg p-6 mt-16 md:mt-0">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Patient List</h2>
            </div>

            {/* Search and Add New - Responsive */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
              <input
                type="text"
                placeholder="Search"
                className="border rounded-lg p-2 w-full md:w-1/3 shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md w-full md:w-auto"
                onClick={handleAddNew}
              >
                Add New +
              </button>
            </div>

            {/* Form */}
            {showForm && (
              <form onSubmit={handleSubmit} className="w-full mb-4 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Patient Name"
                    className="border p-3 rounded-lg shadow-sm w-full"
                    value={newPatient.name}
                    onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Age"
                    className="border p-3 rounded-lg shadow-sm w-full"
                    value={newPatient.age}
                    onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                    required
                  />
                  <select
                    className="border p-3 rounded-lg shadow-sm w-full"
                    value={newPatient.gender}
                    onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <input
                    type="datetime-local"
                    className="border p-3 rounded-lg shadow-sm w-full"
                    value={newPatient.appointment}
                    onChange={(e) => setNewPatient({ ...newPatient, appointment: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Doctor Assigned"
                    className="border p-3 rounded-lg shadow-sm w-full"
                    value={newPatient.doctorAssigned}
                    onChange={(e) => setNewPatient({ ...newPatient, doctorAssigned: e.target.value })}
                    required
                  />
                  <div className="flex gap-4 w-full md:col-span-2 lg:col-span-3">
                    <button type="submit" className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md flex-1">
                      Save
                    </button>
                    <button onClick={() => setShowForm(false)} className="bg-red-400 hover:bg-red-500 text-white p-3 rounded-lg shadow-md flex-1">
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Table - Responsive */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-teal-500 text-white">
                    <th className="p-3 text-left text-[13px] md:text-[15px] md:p-4">ID</th>
                    <th className="p-3 text-left text-[13px] md:text-[15px] md:p-4">Patient Name</th>
                    <th className="p-3 text-left text-[13px] md:text-[15px] md:p-4">Age</th>
                    <th className="p-3 text-left text-[13px] md:text-[15px] md:p-4">Gender</th>
                    <th className="p-3 text-left text-[13px] md:text-[15px] md:p-4">Appointment</th>
                    <th className="p-3 text-left text-[13px] md:text-[15px] md:p-4">Doctor Assigned</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedPatients.length > 0 ? (
                    paginatedPatients.map((patient, index) => (
                      <tr key={patient.id} className="border-b border-gray-300 hover:bg-gray-100 transition">
                        <td className="p-3 md:p-4 text-[13px] md:text-[15px]">{patient.id}</td>
                        <td className="p-3 md:p-4 text-[13px] md:text-[15px] font-medium">{patient.name}</td>
                        <td className="p-3 md:p-4 text-[13px] md:text-[15px]">{patient.age}</td>
                        <td className="p-3 md:p-4 text-[13px] md:text-[15px]">{patient.gender}</td>
                        <td className="p-3 md:p-4 text-[13px] md:text-[15px]">{patient.appointment.replace("T", " ")}</td>
                        <td className="p-3 md:p-4 text-[13px] md:text-[15px]">{patient.doctorAssigned}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center p-4 md:p-6 text-gray-500 text-[13px] md:text-[15px]">
                        No results found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-end gap-2 mt-6">
              <button
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
                className="px-3 py-1 border rounded-lg disabled:opacity-50 text-[13px] md:text-[15px]"
              >
                &lt;
              </button>

              {/* {currentPage > 2 && <span className="px-3 py-1 text-[13px] md:text-[15px]">...</span>} */}

              {[...Array(totalPages).keys()]
                .map((_, i) => i + 1)
                .filter((page) => page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1))
                .map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-3 py-1 border rounded-lg text-[13px] md:text-[15px] ${currentPage === page ? "bg-teal-500 text-white" : ""}`}
                  >
                    {page}
                  </button>
                ))}

              {/* {currentPage < totalPages - 1 && <span className="px-3 py-1 text-[13px] md:text-[15px]">...</span>} */}

              <button
                disabled={currentPage === totalPages}
                onClick={() => goToPage(currentPage + 1)}
                className="px-3 py-1 border rounded-lg disabled:opacity-50 text-[13px] md:text-[15px]"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patient;
