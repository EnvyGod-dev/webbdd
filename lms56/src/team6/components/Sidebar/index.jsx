// components/Sidebar.jsx
import {
  FaHome,
  FaCogs,
  FaSignOutAlt,
  FaChartLine,
  FaClipboardList,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

// Define top and bottom nav items
const navItems = [
  { to: "/team6/pages/dashboard", icon: <FaHome />, label: "Хянах самбар" },
  { to: "/team6/pages/exam", icon: <FaClipboardList />, label: "Шалгалт" },
  { to: "/team6/pages/register", icon: <FaChartLine />, label: "Register" },
];

const bottomItems = [
  { to: "/settings", icon: <FaCogs />, label: "Settings" },
  { to: "/logout", icon: <FaSignOutAlt />, label: "Гарах", isLogout: true },
];

const Sidebar = () => {
  return (
    <aside className="h-screen w-64 bg-white text-white flex flex-col justify-between shadow-xl">
      {/* Top Logo + Menu */}
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-black text-indigo-600 p-2 rounded-full text-lg font-bold">
            • • •
          </div>
          <h1 className="text-xl font-bold text-black">E-student</h1>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-4">
          {navItems.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2 rounded-md text-black text-sm font-medium transition-colors ${
                  isActive ? "bg-indigo-700" : "hover:bg-indigo-500"
                }`
              }
            >
              {/* ✅ Icon always white */}
              <span className="text-black">{icon}</span>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Settings + Logout */}
      <div className="p-6 flex flex-col gap-4">
        {bottomItems.map(({ to, icon, label, isLogout }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isLogout
                  ? "hover:bg-red-500 text-red-200"
                  : isActive
                  ? "bg-indigo-700"
                  : "hover:bg-indigo-500"
              }`
            }
          >
            <span className="text-black">{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
