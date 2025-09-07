import React from 'react';
import { NavLink ,useNavigate} from 'react-router-dom';
import { BookOpenCheck } from "lucide-react"; // npm install lucide-react

const Navbar = () => {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("isAuthenticated");
    navigate("/", { replace: true }); // redirect to Auth page
  }
  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Brand */}
        <h1 className="text-xl font-bold text-white tracking-wide">
          <BookOpenCheck className="w-6 h-6 text-yellow-300" />
          Notes Saver
        </h1>

        {/* Nav Links */}
        <div className="flex gap-6">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `text-white hover:text-yellow-300 transition ${
                isActive ? "font-semibold underline" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              `text-white hover:text-yellow-300 transition ${
                isActive ? "font-semibold underline" : ""
              }`
            }
          >
            My Notes
          </NavLink>
          <button
            onClick={handleLogout}
            className="ml-4 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
