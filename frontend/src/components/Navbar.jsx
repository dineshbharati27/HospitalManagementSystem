import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaBell,
  FaShoppingCart,
  FaSearch,
  FaBars,
  FaHome,
  FaUserMd,
  FaCalendarCheck,
  FaUsers,
  FaPills,
  FaChartBar,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // Sidebar state

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="fixed top-0 w-full bg-white shadow-md p-4 h-16 flex items-center justify-between z-50">
      {/* Logo */}
      <div className="text-2xl font-bold flex items-center">
        <span className="text-teal-500">You</span>
        <span className="text-gray-800">Medi</span>
      </div>

      {/* ✅ Search Bar (Hidden on Small Screens) */}
      <div className="relative w-1/3 hidden md:block">
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-full bg-gray-100 pr-10"
          placeholder="Search"
        />
        <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
      </div>

      {/* ✅ Icons (Hidden on Small Screens) */}
      <div className=" items-center space-x-6 hidden md:flex">
        <FaBell className="text-gray-600 cursor-pointer" />
        <FaShoppingCart className="text-gray-600 cursor-pointer" />
        {user?.role === "admin" && (
          <Link to="/admin-dashboard" className="text-red-500">
            Admin Panel
          </Link>
        )}
        <div className="bg-teal-500 text-white px-4 py-2 rounded-full flex items-center cursor-pointer">
          {user ? (
            <>
              <img
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="User"
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="text-white">{user.username}</span>
            </>
          ) : (
            <Link to="/login" className="text-white">
              Login
            </Link>
          )}
        </div>
      </div>

      {/* ✅ Hamburger Menu Button (Visible Only on Small Screens) */}
      <button
        className="text-gray-600 text-2xl md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars />
      </button>

      {/* ✅ Sidebar Dropdown (Mobile Only) */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 w-full bg-white shadow-md flex flex-col py-4 space-y-4 md:hidden px-4">
          {/* ✅ Mobile Search Bar */}
          <div className="w-full flex items-center px-8 mt-2">
            <div className="relative w-1/2 max-w-sm">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border rounded-full bg-gray-100 text-sm focus:outline-none"
                placeholder="Search"
              />
            </div>
            <div className="flex-grow"></div>
            {/* Login Button */}
            <div>
              {user ? (
                <div className="flex items-center bg-teal-500 text-white px-4 py-2 rounded-full cursor-pointer">
                  <img
                    src="https://randomuser.me/api/portraits/men/1.jpg"
                    alt="User"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span>{user.username}</span>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-teal-500 text-white px-4 py-2 rounded-full text-sm"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Sidebar Links */}
          <div className="w-full flex flex-col items-start space-y-4 px-8">
            <Link
              to="/"
              className="flex items-center gap-x-2 text-gray-700 hover:text-teal-500"
            >
              <FaHome className="w-5 h-5" />
              <span className="pl-4">Dashboard</span>
            </Link>
            <Link
              to="/doctor"
              className="flex items-center gap-x-2 text-gray-700 hover:text-teal-500"
            >
              <FaUserMd className="w-5 h-5" />
              <span className="pl-4">Doctors</span>
            </Link>
            <Link
              to="/appointment"
              className="flex items-center gap-x-2 text-gray-700 hover:text-teal-500"
            >
              <FaCalendarCheck className="w-5 h-5" />
              <span className="pl-4">Appointments</span>
            </Link>
            <Link
              to="/patient"
              className="flex items-center gap-x-2 text-gray-700 hover:text-teal-500"
            >
              <FaUsers className="w-5 h-5" />
              <span className="pl-4">Patients</span>
            </Link>
            <Link
              to="/pharmacy"
              className="flex items-center gap-x-2 text-gray-700 hover:text-teal-500"
            >
              <FaPills className="w-5 h-5" />
              <span className="pl-4">Pharmacy</span>
            </Link>
            <Link
              to="/charts"
              className="flex items-center gap-x-2 text-gray-700 hover:text-teal-500"
            >
              <FaChartBar className="w-5 h-5" />
              <span className="pl-4">Charts</span>
            </Link>
            <Link
              to="/setting"
              className="flex items-center gap-x-2 text-gray-700 hover:text-teal-500"
            >
              <FaCog className="w-5 h-5" />
              <span className="pl-4">Settings</span>
            </Link>
            <Link
              to="/help"
              className="flex items-center gap-x-2 text-gray-700 hover:text-teal-500"
            >
              <FaQuestionCircle className="w-5 h-5" />
              <span className="pl-4">Help Center</span>
            </Link>

            {/* Notifications and Cart */}
            <Link
              to="/notifications"
              className="flex items-center gap-x-2 text-gray-700 hover:text-teal-500"
            >
              <FaBell className="w-5 h-5" />
              <span className="pl-4">Notifications</span>
            </Link>
            <Link
              to="/cart"
              className="flex items-center gap-x-2 text-gray-700 hover:text-teal-500"
            >
              <FaShoppingCart className="w-5 h-5" />
              <span className="pl-4">Cart</span>
            </Link>

            {/* Logout */}
            <button
              onClick={() => {
                localStorage.removeItem("user");
                window.location.href = "/login";
              }}
              className="flex items-center gap-x-2 text-red-500 hover:text-red-600"
            >
              <FaSignOutAlt className="w-5 h-5" />
              <span className="pl-4">Log Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
