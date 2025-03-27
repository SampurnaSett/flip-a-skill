import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "../../new_app/components/Navbar"
import HomePage from "../../new_app/pages/HomePage"
import DiscoverPage from "../../new_app/pages/DiscoverPage"
import MatchesPage from "../../new_app/pages/MatchesPage"
import ChatPage from "../../new_app/pages/ChatPage"
import ProfilePage from "../../new_app/pages/ProfilePage"
import LoginPage from "../../new_app/pages/LoginPage"
import SignupPage from "../../new_app/pages/SignupPage"
import ProtectedRoute from "../../new_app/components/ProtectedRoute"
import { AuthProvider } from "../context/AuthContext"
import "./index.css"
import AboutUs from "../pages/AboutUs"

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route
                path="/discover"
                element={
                  <ProtectedRoute>
                    <DiscoverPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/matches"
                element={
                  <ProtectedRoute>
                    <MatchesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/chat/:id"
                element={
                  <ProtectedRoute>
                    <ChatPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/aboutus"
                element={
                  <ProtectedRoute>
                    <AboutUs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

