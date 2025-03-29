"use client"

import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left Side - Logo */}
        <Link to="/" className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-blue-600"
          >
            <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.29 7 12 12 20.71 7" />
            <line x1="12" x2="12" y1="22" y2="12" />
          </svg>
          <span className="text-xl font-bold">ConnectPro</span>
        </Link>

        {/* Center - Navigation Links */}
        <nav className="hidden md:flex">
          <ul className="flex items-center gap-6">
            <li>
              <Link to="/discover" className="text-gray-500 hover:text-gray-900">
                Discover
              </Link>
            </li>
            <li>
              <Link to="/matches" className="text-gray-500 hover:text-gray-900">
                Connections
              </Link>
            </li>
            <li>
              <Link to="/aboutus" className="text-gray-500 hover:text-gray-900">
                About Us
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right Side - Profile Picture */}
        <div className="flex items-center">
          <Link to="/profile">
            <img
              src="/uploads/wo1.jpeg"  // Replace with actual profile image URL
              alt="Profile"
              className="h-10 w-10 rounded-full border border-gray-300 shadow-sm"
            />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar
