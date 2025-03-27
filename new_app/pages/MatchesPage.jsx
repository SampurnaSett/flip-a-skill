"use client"

import { Link } from "react-router-dom"

const MatchesPage = () => {
  const connections = [
    {
      _id: "1",
      name: "John Doe",
      title: "Software Engineer",
      matchDate: "2 days ago",
      image: "./uploads/m1.jpeg",
      unreadMessages: true,
    },
    {
      _id: "2",
      name: "Jane Smith",
      title: "Product Designer",
      matchDate: "5 days ago",
      image: "./uploads/m2.jpeg",
      unreadMessages: false,
    },
    {
      _id: "3",
      name: "David Johnson",
      title: "Marketing Specialist",
      matchDate: "1 week ago",
      image: "./uploads/m3.jpeg",
      unreadMessages: true,
    },
    {
      _id: "4",
      name: "David Beh",
      title: "AI Specialist",
      matchDate: "1 week ago",
      image: "./uploads/m4.jpeg",
      unreadMessages: true,
    },
    {
      _id: "5",
      name: "Alia Khatun",
      title: "Data Science Specialist",
      matchDate: "1 week ago",
      image: "./uploads/wo1.jpeg",
      unreadMessages: false,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Your Connections</h1>
      {connections.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
          <div className="mb-4 rounded-full bg-gray-100 p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-gray-500"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-semibold">No connections yet</h3>
          <p className="mb-4 max-w-sm text-gray-500">
            Start swiping to discover professionals and make new connections.
          </p>
          <Link to="/discover">
            <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              Discover Professionals
            </button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {connections.map((match) => (
            <div key={match._id} className="flex items-center gap-4 p-4 rounded-lg border">
              <div className="relative h-12 w-12">
                <img
                  src={match.image}
                  alt={match.name}
                  className="rounded-full object-cover h-full w-full"
                />
                {match.unreadMessages && (
                  <span className="absolute right-0 top-0 h-3 w-3 rounded-full bg-blue-600"></span>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{match.name}</h3>
                <p className="text-sm text-gray-500">
                  {match.title} • Matched {match.matchDate}
                </p>
              </div>
              <Link to={`/chat/${match._id}`}>
                <button
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    match.unreadMessages ? "bg-blue-600 text-white" : "border border-gray-300 text-gray-700 bg-white"
                  }`}
                >
                  {match.unreadMessages ? "New Message" : "Message"}
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MatchesPage
