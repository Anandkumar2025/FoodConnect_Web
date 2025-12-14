import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const LoggedIn = localStorage.getItem("isLoggedIn");
  const Org = localStorage.getItem("Org");
  const navigate = useNavigate();





  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus) {
      setIsLoggedIn(true);
    }
  }, []);



  const handleSignOut = () => {

    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
   
  };

  const handlesigin = () => {
    const loggedInStatus = localStorage.getItem('!isLoggedIn');
    if (loggedInStatus) {
      setIsLoggedIn(true);
    }
    navigate('/signin');
      
  };


  const handleUser = (e) => {

    if (LoggedIn) {
      if (Org === "ngo") {
        navigate('/ngodash');
        // console.log(Org);
      } else if (Org === "restaurant") {
        navigate('/restdash');
        // console.log(Org);
      } else {
        alert("Invalid organization type");
      }
    } else {
      navigate('/signin');
    }
  }

  return (
    <div className="bg-gray-100 p-2 lg:p-4 sticky top-0 z-20 shadow-md">
      <nav className="container mx-auto flex items-center justify-between">
        <div className="text-orange-500 text-2xl md:text-3xl lg:text-4xl font-bold">
          <a href="/">Foodconnect</a>
        </div>

        <div className="Desktop_Navigation hidden md:flex space-x-6  text-xl lg:text-2xl ">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${isActive ? 'text-orange-500 font-semibold' : 'text-gray-400 hover:text-gray-900'} font-semibold`
            }
          >Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${isActive ? 'text-orange-500 font-semibold' : 'text-gray-400 hover:text-gray-900'} font-semibold`
            }
          >About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${isActive ? 'text-orange-500 font-semibold' : 'text-gray-400 hover:text-gray-900'} font-semibold`
            }
          >Contact
          </NavLink>
          {isLoggedIn && (
            <button onClick={handleUser} className="text-gray-400 hover:text-gray-900 font-medium">User</button>
          )}
          {!isLoggedIn && (
            <NavLink
            to="/signin"
              className={({ isActive }) =>
                `${isActive ? 'text-orange-500 font-semibold' : 'text-gray-400 hover:text-gray-900'} font-semibold`
              }
              onClick={handlesigin}
            > Signin
            </NavLink>
          )}
          {isLoggedIn && (
            <NavLink
            to="/signin"
            className={({ isActive }) =>
              `${isActive ? 'text-orange-500 font-semibold' : 'text-gray-400 hover:text-gray-900'} font-semibold`
            }
            onClick={(handleSignOut)}
            >Signout
            </NavLink>
          )}

          

        </div>

        <div className="Hamburger md:hidden ">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="Mobile_Navigation md:hidden bg-gray-50 rounded-lg shadow-lg p-4 space-y-4 text-lg ">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${isActive ? 'text-orange-500 bg-gray-200 hover:bg-gray-300' : 'text-gray-600 hover:bg-gray-300'} block px-3 py-2 rounded-md`
            }
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${isActive ? 'text-orange-500 bg-gray-200 hover:bg-gray-300' : 'text-gray-600 hover:bg-gray-300'} block px-3 py-2 rounded-md`
            }
            onClick={() => setIsOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${isActive ? 'text-orange-500 bg-gray-200 hover:bg-gray-300' : 'text-gray-600 hover:bg-gray-300'} block px-3 py-2 rounded-md`
            }
            onClick={() => setIsOpen(false)}
          >Contact
          </NavLink>
          {!isLoggedIn && (
            <NavLink
              to="/signin"
              className={({ isActive }) =>
                `${isActive ? 'text-orange-500 bg-gray-200 hover:bg-gray-300' : 'text-gray-600 hover:bg-gray-300'} block px-3 py-2 rounded-md`
              }
              onClick={handlesigin}
            > Signin
            </NavLink>
          )}
          {isLoggedIn && (
            <NavLink
              to="/signin"
              className="text-gray-600 hover:bg-gray-300  block px-3 py-2 rounded-md"
              onClick={handleSignOut}
            > Signout
            </NavLink>
          )}

          {isLoggedIn && (
            <div >
              <button 
              onClick={handleUser} 
              className="text-gray-600 w-full text-start active:text-gray-200 hover:bg-gray-300  px-3 py-2 rounded-md" >
                User
                </button>
                </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Nav;



