"use client"

import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <header className="sticky top-0 z-10 border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
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

        {currentUser ? (
          <>
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
                  <Link to="/profile" className="text-gray-500 hover:text-gray-900">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/aboutus" className="text-gray-500 hover:text-gray-900">About Us</Link>
                </li>
              </ul>
            </nav>
            <div className="flex items-center gap-4">
              <button onClick={handleLogout} className="text-gray-500 hover:text-gray-900">
                Log out
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/login" className="hidden md:block">
              <span className="text-gray-500 hover:text-gray-900">Log in</span>
            </Link>
            <Link to="/signup">
              <span className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white">Sign up</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar

