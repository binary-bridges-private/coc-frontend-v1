import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { toggleLoginPopup } from '../../store/slices/PopupSlice.ts';
import { logoutUser } from '../../store/slices/AuthSlice.ts';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useAppSelector((state) => state.auth.isAuthenticated);
  const userData = useAppSelector((state) => state.auth.userData);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const navItems = [
    { name: "Home", path: "/home" },
    { name: "Practice", path: "/practice" },
    { name: "Courses", path: "/courses" },
    { name: "About Us", path: "/about" },
  ];

  return (
    <>
      {/* Main Header */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`sticky top-0 z-40 w-full ${
          scrolled 
            ? 'bg-white/90 backdrop-blur-md shadow-md' 
            : 'bg-white'
        } transition-all duration-300`}
      >
        <div className="h-[10vh] navbar">
          {/* Logo Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-none ml-4 md:ml-8"
          >
            <Link to="/home" className="flex items-center gap-2 group">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="w-auto h-11" 
                src='/assets/logo.svg' 
                alt="COC Education Logo" 
              />
            </Link>
          </motion.div>

          {/* Contact Info with Animated Icon */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 hidden mx-4 overflow-hidden md:block md:mx-8"
          >
            <div className="flex items-center h-full px-4 rounded-lg bg-gray-50/80 backdrop-blur-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-gray-800 to-gray-700">
                  <motion.svg 
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="w-4 h-4 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </motion.svg>
                </div>
                <div className="overflow-hidden whitespace-nowrap">
                  <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{ 
                      x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 20,
                        ease: "linear"
                      }
                    }}
                    className="text-sm font-medium text-gray-700"
                  >
                    PURCHASE ENQUIRY: <span className="text-orange-600">7303445575, 8448322142, 9999631597, 7011668629</span> | 
                    TRACKING ID RELATED: <span className="text-orange-600">8595539968</span> | 
                    TECHNICAL SUPPORT OR LOGIN ID RELATED ISSUE: <span className="text-orange-600">9811455109, 9319493165</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Auth Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex-none gap-4 mr-4"
          >
            {!isLoggedIn ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => dispatch(toggleLoginPopup())}
                className="px-6 py-2.5 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-lg 
                          shadow-sm hover:shadow-lg transition-all duration-200"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                  </svg>
                  Sign In
                </span>
              </motion.button>
            ) : (
              <div className="dropdown dropdown-end">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  tabIndex={0}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-full border border-gray-200 shadow-sm
                             transition-all duration-200 cursor-pointer bg-white hover:shadow-md"
                >
                  <div className="flex items-center justify-center font-semibold text-white bg-gradient-to-br from-gray-700 to-gray-900 rounded-full w-9 h-9">
                    {userData?.firstName?.charAt(0) || 'U'}
                  </div>
                  <span className="hidden font-medium text-gray-700 md:inline-block">
                    {userData?.firstName || 'User'}
                  </span>
                  <motion.svg 
                    animate={{ y: [0, 2, 0] }} 
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    xmlns="http://www.w3.org/2000/svg" 
                    className="w-4 h-4 text-gray-500"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </motion.div>

                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 mt-2 shadow-xl bg-white/90 backdrop-blur-md rounded-xl 
                            w-64 border border-gray-100"
                >
                  <li className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 font-semibold text-white bg-gradient-to-br from-gray-700 to-gray-900 rounded-full">
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
                    <Link to="/profile" className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700
                          hover:bg-gray-100/80 rounded-lg transition-all duration-200 hover:pl-5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      My Profile
                    </Link>
                  </li>
                  <li className="mt-1">
                    <Link to="/my-courses" className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700
                          hover:bg-gray-100/80 rounded-lg transition-all duration-200 hover:pl-5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                      </svg>
                      My Courses
                    </Link>
                  </li>
                  <li className="mt-1">
                    <button
                      onClick={() => dispatch(logoutUser())}
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 
                               hover:bg-red-50/80 rounded-lg transition-all duration-200 hover:pl-5"
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
          </motion.div>
        </div>

        {/* Navigation Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={`h-[6vh] ${scrolled ? 'bg-gray-900/95' : 'bg-gray-900'} backdrop-blur-sm transition-all duration-300`}
        >
          <div className="container h-full mx-auto">
            <div className="items-center justify-center hidden h-full lg:flex">
              {navItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={index}
                    to={item.path}
                    className="relative flex items-center h-full px-5 font-medium text-gray-300 transition-colors duration-300 group"
                  >
                    <motion.span
                      initial={false}
                      animate={{ color: isActive ? 'rgb(255, 255, 255)' : 'rgb(209, 213, 219)' }}
                      className="relative z-10"
                    >
                      {item.name}
                    </motion.span>
                    
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-orange-600/10 rounded-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    
                    <motion.span 
                      initial={{ width: 0, left: '50%' }}
                      whileHover={{ width: '80%', left: '10%' }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-1.5 h-0.5 bg-orange-500 rounded-full"
                    />
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="flex items-center h-full px-4 text-white lg:hidden"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 bg-white/90 backdrop-blur-md lg:hidden"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <img className="h-10" src='/assets/logo.svg' alt="Logo" />
              <motion.button 
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
                onClick={toggleMenu} 
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              className="p-4"
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                >
                  <Link
                    to={item.path}
                    onClick={toggleMenu}
                    className="block p-3 mb-2 text-gray-700 transition-all duration-200 rounded-lg hover:bg-gray-100/80 hover:pl-5"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="mt-6 pt-4 border-t border-gray-100"
              >
                <div className="p-4 mb-2 text-sm font-medium text-gray-700 bg-gray-50/80 backdrop-blur-sm rounded-xl shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-gray-800 to-gray-700">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <span>Contact Information</span>
                  </div>
                  <p className="flex items-center gap-2 py-1.5 text-sm text-gray-600">
                    <span className="text-xs px-2 py-1 rounded bg-gray-100">PURCHASE</span>
                    <span className="text-orange-600">7303445575, 8448322142</span>
                  </p>
                  <p className="flex items-center gap-2 py-1.5 text-sm text-gray-600">
                    <span className="text-xs px-2 py-1 rounded bg-gray-100">TRACKING</span>
                    <span className="text-orange-600">8595539968</span>
                  </p>
                  <p className="flex items-center gap-2 py-1.5 text-sm text-gray-600">
                    <span className="text-xs px-2 py-1 rounded bg-gray-100">SUPPORT</span>
                    <span className="text-orange-600">9811455109</span>
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;