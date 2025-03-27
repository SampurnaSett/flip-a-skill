"use client"

import { useState } from "react"

const ProfilePage = () => {
  // Static user data
  const [user, setUser] = useState({
    name: "Sweety Sinha",
    title: "Full-Stack Developer",
    location: "Kolkata, India",
    bio: "Passionate about building web experiences and AI solutions.",
    skills: ["React", "Node.js", "Tailwind CSS", "MongoDB"],
    image: "/uploads/wo1.jpeg", // Replace with actual image URL
  })

  // Edit mode state
  const [isEditing, setIsEditing] = useState(false)

  // Handle input changes in edit mode
  const handleChange = (e) => {
    const { name, value } = e.target
    setUser((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <img
            src={user.image}
            alt={user.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
          />
          <h2 className="text-2xl font-semibold mt-3">{user.name}</h2>
          <p className="text-gray-500">{user.title} • {user.location}</p>
        </div>

        {/* Bio Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">About Me</h3>
          <p className="mt-2 text-gray-600">{user.bio}</p>
        </div>

        {/* Skills Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">Skills</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {user.skills.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Edit Profile Section */}
      {isEditing && (
        <div className="mt-6 bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Edit Profile</h3>

          {/* Name */}
          <div className="mb-4">
            <label className="text-gray-600 block">Full Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Title */}
          <div className="mb-4">
            <label className="text-gray-600 block">Professional Title</label>
            <input
              type="text"
              name="title"
              value={user.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="text-gray-600 block">Location</label>
            <input
              type="text"
              name="location"
              value={user.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Bio */}
          <div className="mb-4">
            <label className="text-gray-600 block">Bio</label>
            <textarea
              name="bio"
              value={user.bio}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>

          {/* Save and Cancel Buttons */}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfilePage
