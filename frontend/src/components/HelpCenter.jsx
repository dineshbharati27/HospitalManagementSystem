import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const HelpCenter = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/faqs")
      .then((res) => res.json())
      .then((data) => setFaqs(data))
      .catch((err) => console.error("Error fetching FAQs:", err));
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex flex-1">
        {/* Sidebar for Large Screens */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 md:p-8 bg-gray-100 md:ml-60 mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">
            Help Center
          </h2>

          {/* FAQs Section */}
          <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 mb-6 md:mb-8">
            <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-3 md:mb-4">
              Frequently Asked Questions
            </h3>
            {faqs.map((faq, index) => (
              <div key={index} className="mb-3 border-b pb-2">
                <button
                  className="text-teal-600 font-medium w-full text-left focus:outline-none"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  {faq.question}
                </button>
                {openFAQ === index && (
                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>

          {/* Contact Support */}
          <div className="bg-white shadow-lg rounded-lg p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-3 md:mb-4">
              Contact Support
            </h3>
            <p>
              Email:{" "}
              <a
                href="mailto:support@hospital.com"
                className="text-teal-500 font-medium hover:underline"
              >
                support@hospital.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <span className="text-teal-500 font-medium">+1 234 567 890</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
