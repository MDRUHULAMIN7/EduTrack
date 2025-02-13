import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaFacebookF, FaWhatsapp, FaBars, FaTimes } from "react-icons/fa";
import UseAuth from "../../Hooks/UseAuth";
import {  toast } from 'react-toastify';
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false); 
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { user ,logout} = UseAuth();
  if (user) {
    console.log(user);
  }

  return (
    <header>
     
      <div className="bg-[#002147] text-white text-sm py-2">
        <div className="container mx-auto flex justify-between items-center px-4">
          <p>Contact: Nowhata, Rajshahi, Bangladesh</p>
          <div className="flex items-center space-x-4">
            <FaFacebookF className="text-white hover:text-[#3a9970] cursor-pointer" />
            <FaWhatsapp className="text-white hover:text-[#3a9970] cursor-pointer" />
            <p>Phone: +88 01903001637</p>
          </div>
        </div>
      </div>

      <nav className="bg-[#eaf4f4] shadow">
        <div className="container mx-auto flex justify-between items-center py-4 px-4">
        
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="Education Master Logo" className="h-10 sm:h-12" />
            <div>
              <h1 className="text-lg sm:text-2xl font-bold text-[#002147]">
                EDU <span className="text-[#3a9970]">TRACK</span>
              </h1>
              <p className="text-xs text-[#6c757d]">UNIVERSITY | COLLEGE</p>
            </div>
          </div>

         
          <ul className="hidden md:flex space-x-6 text-sm font-semibold text-[#002147]">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-[#3a9970]" : "hover:text-[#3a9970]"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "text-[#3a9970]" : "hover:text-[#3a9970]"
                }
              >
                About us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admisions"
                className={({ isActive }) =>
                  isActive ? "text-[#00e682]" : "hover:text-[#3a9970]"
                }
              >
                Admission
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/colleges"
                className={({ isActive }) =>
                  isActive ? "text-[#3a9970]" : "hover:text-[#3a9970]"
                }
              >
                Colleges
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/mycollege"
                className={({ isActive }) =>
                  isActive ? "text-[#3a9970]" : "hover:text-[#3a9970]"
                }
              >
                My College
              </NavLink>
            </li>
          </ul>

        
          <div className="hidden md:block relative">
            {user?.email ? (
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <img
                  src={user?.photoURL}
                  className="h-10 w-10 border-2 border-[#6b9080] rounded-full"
                  alt="User"
                />
                {dropdownOpen && (
                  <div className="absolute right-6 top-6 z-50  w-48 bg-white shadow-lg rounded-md">
                    <Link
                      to={`/profile/${user?.email}`}
                      className="block px-4 py-2 text-sm text-[#002147] hover:bg-[#3a9970] hover:rounded-md hover:text-white"
                    >
                      Profile
                    </Link>
                    <button
                      className="block w-full hover:rounded-md cursor-pointer text-left px-4 py-2 text-sm text-[#002147] hover:bg-[#3a9970] hover:text-white"
                      onClick={() => (logout()
                        .then((res) => {
                          console.log(res);
                          setMenuOpen(false);
                          toast("Logged out")

                        })
                        .catch((err) => {
                          console.log(err);
                        }))}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/signin"
                className="bg-[#3a9970] text-white px-2 py-1 rounded-md hover:bg-blue-700"
              >
                Sign In
              </Link>
            )}
          </div>

    
          <div className="md:hidden flex cursor-pointer items-center">
            <button
              className="text-[#002147] text-2xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes className="cursor-pointer" /> : <FaBars className="cursor-pointer"  />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="bg-white shadow-md md:hidden">
            <ul className="flex flex-col space-y-4 text-sm font-semibold text-[#002147] py-4 px-4">
              <li>
                <NavLink
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive ? "text-[#3a9970]" : "hover:text-[#3a9970]"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive ? "text-[#3a9970]" : "hover:text-[#3a9970]"
                  }
                >
                  About us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admisions"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive ? "text-[#3a9970]" : "hover:text-[#3a9970]"
                  }
                >
                  Admission
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/colleges"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive ? "text-[#3a9970]" : "hover:text-[#3a9970]"
                  }
                >
                  Colleges
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/mycollege"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive ? "text-[#3a9970]" : "hover:text-[#3a9970]"
                  }
                >
                  My College
                </NavLink>
              </li>
              <li>
                {user?.email ? (
                  <>
                    <Link
                     to={`/profile/${user?.email}`}
                      onClick={() => setMenuOpen(false)}
                      className="block  cursor-pointer py-2 text-sm text-[#002147] hover:text-[#3a9970] "
                    >
                      Profile
                    </Link>
                    <button
                      className="block w-full text-left  cursor-pointer py-2 text-sm text-[#002147] hover:text-[#3a9970] "
                      onClick={() => (logout()
                        .then((res) => {
                          console.log(res);
                          setMenuOpen(false);
                          toast("Logged out")

                        })
                        .catch((err) => {
                          console.log(err);
                        }))} 
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/signin"
                    className="bg-[#3a9970] text-white px-4 py-1 rounded-md hover:bg-[#7fbda5]"
                  >
                    Sign In
                  </Link>
                )}
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
