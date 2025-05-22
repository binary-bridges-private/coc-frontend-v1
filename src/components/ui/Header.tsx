import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { toggleLoginPopup } from '../../store/slices/PopupSlice.ts';
import { logoutUser } from '../../store/slices/AuthSlice.ts';

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.auth.isAuthenticated);
  const userData = useAppSelector((state) => state.auth.userData);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navItems = [
    { name: "Home", path: "/home" },
    { name: "Practice", path: "/practice" },
  ];

  return (
    <>
      {/* Main Header */}
      <div className="bg-white h-[10vh] navbar shadow-md border-b">
        {/* Logo Section */}
        <div className="flex-none ml-8">
          <Link to="/home" className="flex items-center gap-2">
            <img className="w-auto h-12" src='/assets/logo.svg' alt="COC Education Logo" />
          </Link>
        </div>

        {/* Contact Info Marquee */}
        <div className="flex-1 mx-8 overflow-hidden">
          <div className="flex items-center h-full px-4 rounded-lg bg-gray-50">
            <div className="animate-marquee whitespace-nowrap animate-[scrollLeft_40s_linear_infinite]">
              <span className="text-sm font-medium text-gray-600 ">
                PURCHASE ENQUIRY: 7303445575, 8448322142, 9999631597, 7011668629 |
                TRACKING ID RELATED: 8595539968 |
                TECHNICAL SUPPORT OR LOGIN ID RELATED ISSUE: 9811455109, 9319493165
              </span>
            </div>
          </div>
        </div>

        {/* Auth Section */}
        <div className="flex-none gap-4 mr-4">
          {!isLoggedIn ? (
            <button
              onClick={() => dispatch(toggleLoginPopup())}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg 
                        shadow-sm hover:shadow-md transition-all duration-200
                        hover:from-blue-700 hover:to-blue-600 active:scale-95"
            >
              Sign In
            </button>
          ) : (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                className="flex items-center gap-2 p-1.5 pr-3 rounded-full hover:bg-gray-100 
                           transition-colors duration-200 cursor-pointer"
              >
                <div className="flex items-center justify-center font-semibold text-blue-600 bg-blue-100 rounded-full w-9 h-9">
                  {userData?.firstName?.charAt(0) || 'U'}
                </div>
                <span className="hidden font-medium text-gray-700 md:inline-block">
                  {userData?.firstName || 'User'}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 mt-2 shadow-xl bg-white rounded-xl 
                          w-64 border border-gray-100"
              >
                <li className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 font-semibold text-blue-600 bg-blue-100 rounded-full">
                      {userData?.firstName?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {userData?.firstName + ' ' + userData?.lastName || 'Guest User'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {userData?.email || 'Welcome!'}
                      </p>
                    </div>
                  </div>
                </li>
                <li className="mt-1">
                  <button
                    onClick={() => dispatch(logoutUser())}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 
                             hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="h-[6vh] bg-gray-100 border-b p-1">
        <div className="container h-full mx-auto">
          <div className="items-center justify-center hidden h-full lg:flex">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="relative flex items-center h-full px-5 font-medium text-gray-600 transition-colors duration-200 hover:text-blue-600 group"
              >
                {item.name}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-600 
                               transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="flex items-center h-full px-4 text-gray-600 lg:hidden hover:text-blue-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-white lg:hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <img className="h-10" src='/assets/logo.svg' alt="Logo" />
            <button onClick={toggleMenu} className="text-gray-500 hover:text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                onClick={toggleMenu}
                className="block p-3 mb-1 text-gray-700 transition-colors duration-200 rounded-lg hover:bg-blue-50"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;