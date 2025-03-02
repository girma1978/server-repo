import { useState } from "react";
import Button from "./Button";
import { FaUserCircle } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="bg-amber-700 p-4 flex justify-between items-center shadow-md">
      <a
        href="/"
        className="text-white text-2xl font-family: 'Poppins', sans-serif italic"
      >
        Next Venue
      </a>
      <div className="flex gap-4">
        {isLoggedIn ? (
          <Button className="flex items-center gap-2 bg-orange-500 text-blue-600 hover:bg-gray-100">
            <FaUserCircle size={20} /> Profile
          </Button>
        ) : (
          <>
            <Button
              className="bg-amber-300 text-slate-600 hover:bg-amber-800"
              onClick={() => setIsLoggedIn(true)}
            >
              Login
            </Button>
            <Button className="bg-amber-400 text-white hover:bg-yellow-800">
              Register
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
