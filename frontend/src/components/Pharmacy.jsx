import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Pharmacy = () => {
  const [medicines, setMedicines] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.description && form.price) {
      setMedicines([...medicines, form]);
      setForm({ name: "", description: "", price: "" });
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content Wrapper */}
      <div className="flex flex-1 overflow-y-auto">
        {/* Sidebar - Hidden on small screens */}
        <aside className="w-64 hidden sm:block">
          <Sidebar />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-[#E0FFFF] p-4 sm:p-8 mt-16">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-4">
              <h2 className="font-bold text-2xl sm:text-3xl">Pharmacy</h2>
              <div className="w-full sm:w-auto flex justify-end sm:justify-start">
                <button className="px-4 py-2 bg-[#17C3B2] text-white rounded-lg">
                  Export
                </button>
              </div>
            </div>

            {/* Add Medicine Form */}
            <div className="bg-white p-5 rounded-lg shadow-md mt-4">
              <h3 className="font-bold text-lg mb-3">Add Medicine</h3>
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-end"
              >
                <div className="flex flex-col">
                  <label className="mb-1">Medicine Name*</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Medicine Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="p-2 border border-[#ddd] focus:border-black rounded-full transition-all focus:outline-none"
                  />
                </div>

                {/* Description aligned with Name & Price fields */}
                <div className="flex flex-col sm:col-span-2">
                  <label className="mb-1">Medicine Description*</label>
                  <textarea
                    name="description"
                    placeholder="Enter Medicine Description"
                    value={form.description}
                    onChange={handleChange}
                    required
                    rows="2"
                    className="p-2 border border-[#ddd] focus:border-black rounded-md transition-all focus:outline-none resize-none"
                  ></textarea>
                </div>

                <div className="flex flex-col">
                  <label className="mb-1">Price*</label>
                  <input
                    type="number"
                    name="price"
                    placeholder="Enter Price"
                    value={form.price}
                    onChange={handleChange}
                    required
                    className="p-2 border border-[#ddd] focus:border-black rounded-full transition-all focus:outline-none"
                  />
                </div>

                {/* Add Button moved to the far right */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#17C3B2] text-white rounded-lg w-full sm:w-auto"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>

            {/* Medicine List */}
            <div className="mt-4">
              {medicines.map((medicine, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-md mb-4"
                >
                  <h4 className="font-bold text-lg">
                    Medicine Name: {medicine.name}
                  </h4>
                  <p>
                    <strong>Description:</strong> {medicine.description}
                  </p>
                  <p className="font-bold text-[#17C3B2]">
                    <strong>Price:</strong> ${medicine.price}
                  </p>
                </div>
              ))}
            </div>

            {/* Graph & Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {/* Graph */}
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <h4 className="font-bold text-lg">Pharmacy Status</h4>
                <img
                  src="https://i.imgur.com/W40OoXz.png"
                  alt="Graph"
                  className="w-full h-auto rounded-md"
                />
              </div>

              {/* Stats Cards */}
              <div className="flex flex-col gap-4">
                {/* Earnings */}
                <div className="bg-white p-4 rounded-lg shadow-md flex justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-bold text-orange-500">
                      Annual Earning
                    </h4>
                    <p className="text-xl font-bold">$150,500</p>
                    <div className="w-full h-2 bg-orange-200 rounded-full">
                      <div className="w-4/5 h-full bg-orange-500 rounded-full"></div>
                    </div>
                    <p className="text-sm text-orange-500">
                      🔼 90% Vs Last Year
                    </p>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-purple-600">Daily Earning</h4>
                    <p className="text-xl font-bold">$15,500</p>
                    <div className="w-full h-2 bg-purple-200 rounded-full">
                      <div className="w-1/5 h-full bg-purple-600 rounded-full"></div>
                    </div>
                    <p className="text-sm text-purple-600">
                      🔼 20% Vs Last Day
                    </p>
                  </div>
                </div>

                {/* Top Pharmacist */}
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                  <h4 className="font-bold text-lg">Our Top Pharmacist</h4>
                  <img
                    src="https://i.imgur.com/GubAU1O.png"
                    alt="Pharmacist"
                    className="w-40 h-40 rounded-full mx-auto mt-4"
                  />
                  <p className="font-bold mt-2">
                    Congratulations Aliaa, Mai, Donia
                  </p>
                  <p className="text-sm text-gray-600">
                    Lorem ipsum dolor sit amet consectetur. Pharetra neque duis
                    nulla diam consectetur.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Pharmacy;
