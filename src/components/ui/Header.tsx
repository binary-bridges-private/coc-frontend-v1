import React, { useState } from 'react'

const Header = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div style={{ backgroundColor: "#D30031" }} className="flex items-center justify-center h-auto p-2 text-white">
        <text className="text-mini" >NEED ASSISTANCE IN BUYING / ORDERING ? CALL 7303445575, 8448322142, 9999631597, 7011668629 NOW [Office Timing 10AM to 7PM ]</text>
      </div>
      <div className="bg-white min-h-24 navbar">
        <div className="flex-1 ml-8">
          <img className="h-12" src='/assets/logo.svg' />
        </div>
        <div className="flex-none">

          {/* searchbox */}
          <div className="mr-4 form-control">
            <input type="text" placeholder="Search here" className="bg-[#EDEDED] w-24 text-gray-800 placeholder-gray-500 input input-bordered md:w-auto focus:outline-none" />
          </div>

          {/* login/signup */}
          <button style={{ backgroundColor: '#101C36' }} className="mr-4 text-white btn">Login</button>

          {/* cart */}
          <div className="mr-8 dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="badge badge-sm indicator-item">0</span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
              <div className="card-body">
                <span className="text-lg font-bold">0 Items</span>
                <span className="text-info">Subtotal: $0</span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">View cart</button>
                </div>
              </div>
            </div>
          </div>

          {/* Profile */}
          {/* <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div> */}
        </div>
      </div>
      
      <div
        style={{ backgroundColor: "#101C36" }}
        className="h-16 text-white navbar bg-base-100"
      >
        {/* Hamburger Icon for Small Screens */}
        <div className="flex items-center justify-between w-full px-4 lg:hidden">
          <button onClick={toggleMenu} className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Horizontal Menu for Larger Screens */}
        <div className="items-center justify-center hidden w-full lg:flex">
          <ul className="flex items-center space-x-2 menu menu-horizontal">
            {[
              "Home",
              "About-Us",
              "Courses",
              "Test-Papers",
              "E-Book",
              "Faculties",
              "Quiz",
              "Free-Lectures",
              "Blogs",
              "FAQs",
              "Contact-Us",
            ].map((item, index) => (
              <li key={index} className="h-16 hover:border-b-2">
                <a
                  href="#"
                  className="flex items-center h-full px-4 border-b-2 border-transparent laptop1:px-2 text-small"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Full-Screen Popup Menu for Small Screens */}
        {menuOpen && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-90">
            <button
              onClick={toggleMenu}
              className="absolute text-white top-4 right-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <ul className="flex flex-col items-center space-y-4 text-white text-large">
              {[
                "Home",
                "About-Us",
                "Courses",
                "Test-Papers",
                "E-Book",
                "Faculties",
                "Quiz",
                "Free-Lectures",
                "Blogs",
                "FAQs",
                "Contact-Us",
              ].map((item, index) => (
                <li key={index}>
                  <a href="#" onClick={toggleMenu}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}

export default Header