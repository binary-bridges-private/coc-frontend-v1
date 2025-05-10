import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { toggleLoginPopup } from '../../store/slices/PopupSlice.ts';
import { logout, logoutUser } from '../../store/slices/AuthSlice.ts';

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.auth.isAuthenticated);
  const userData = useAppSelector((state) => state.auth.userData);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const navItems = [
    { name: "Home", path: "/home" },
    { name: "Practice", path: "/practice" },
    // { name: "About Us", path: "/about" },
    // { name: "Courses", path: "/courses" },
    // { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Top Banner */}
      <div className="flex items-center justify-center h-auto p-2 text-white bg-gradient-to-br from-theme3 to-theme4">
        <span className="text-md text-theme1">
          NEED ASSISTANCE IN BUYING/ORDERING? CALL 7303445575, 8448322142, 9999631597, 7011668629 NOW [Office Timing 10AM to 7PM]
        </span>
      </div>

      {/* Main Header */}
      <div className="bg-white min-h-14 navbar">
        <div className="flex-none ml-8">
          <Link to="/home" className="flex items-center">
            <img className="h-12" src='/assets/logo.svg' alt="Company Logo" />
          </Link>
        </div>

        {/* <div className="flex items-center justify-center flex-1 ml-8">
          <div className="flex items-center justify-center px-20 border-2">
            <h1 className="mr-2 text-lg font-bold text-theme1">"Be Skilled Be Pro"</h1>
            <h1 className="p-2 mr-2 text-lg font-bold text-white rounded-md bg-theme1">CFM(Chartered Financial Management)</h1>
            <img className="h-12" src="/cfmLogo.jpg" alt="Logo" />
          </div>
        </div> */}

        <div className="flex items-center justify-center flex-1 ml-8 overflow-hidden">
          <div className="flex gap-4 px-20 overflow-hidden whitespace-nowrap">
            <div className='flex items-center justify-center animate-scrollLeft'>
              <h1 className="mr-2 text-lg font-bold text-theme1">"Be Skilled Be Pro"</h1>
              <h1 className="p-2 mr-2 text-lg font-bold text-white rounded-md bg-theme1 mr2">
                CFM(Chartered Financial Management)
              </h1>
              <img className="h-12" src="/cfmLogo.jpg" alt="Logo" />
            </div>
          </div>
        </div>


        <div className="flex-none gap-4 ">
          {/* Login Button */}
          {!isLoggedIn && (
            <button
              onClick={() => dispatch(toggleLoginPopup())}
              className="bg-theme1 mr-4 text-white btn hover:bg-[white],color-[white]"
            >
              Login
            </button>
          )}

          {isLoggedIn && (
            <div className="dropdown dropdown-end dropdown-hover">
              <div
                tabIndex={0}
                role="button"
                className="flex items-center gap-1 px-4 py-2 transition-all duration-200 rounded-full hover:bg-blue-50"
              >
                <div className="flex items-center justify-center w-8 h-8 text-blue-600 bg-blue-100 rounded-full">
                  <span className="text-sm font-semibold leading-none">
                    {userData?.firstName?.charAt(0) || 'U'}
                  </span>
                </div>
                <span className="hidden font-medium text-blue-600 md:inline">
                  {userData?.firstName || 'User'}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="hidden w-4 h-4 text-blue-400 md:inline"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow-xl bg-white rounded-box w-64 border border-gray-100 mt-2"
              >
                <li className="p-3 menu-title bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-box">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 text-white bg-blue-600 rounded-full">
                      <span className="text-lg font-bold leading-none">
                        {userData?.firstName?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {`${userData?.firstName} ${userData?.lastName}` || 'Hello Guest'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {userData?.email || 'Welcome!'}
                      </p>
                    </div>
                  </div>
                </li>

                <div className="my-0 divider"></div>

                <li>
                  <button
                    className="font-medium text-red-500 hover:bg-red-50"
                    onClick={() => dispatch(logoutUser())}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    {userData ? 'Logout' : 'Login'}
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="flex items-center h-12 text-white min-h-12 bg-theme1 navbar">
        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="p-2 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden w-full h-full lg:flex lg:justify-center">
          <ul className="flex items-center h-full space-x-2 menu menu-horizontal">
            {navItems.map((item, index) => (
              <li key={index} className="flex items-center h-full ">
                <Link
                  to={item.path}
                  className="flex items-center h-full px-4 text-lg hover:text-xl hover:bg-transparent" 
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-90 lg:hidden">
          <button onClick={toggleMenu} className="absolute text-white top-4 right-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <ul className="flex flex-col items-center space-y-8 text-2xl text-white">
            {navItems.map((item, index) => (
              <li key={index} onClick={toggleMenu}>
                <Link to={item.path} className="hover:text-gray-300">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;