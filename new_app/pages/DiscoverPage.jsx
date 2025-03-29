"use client";

import { useState, useRef, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DiscoverPage = () => {
  const profiles = [
    {
      _id: "1",
      name: "John Doe",
      title: "Software Engineer",
      location: "New York, USA",
      skills: ["React", "Node.js", "MongoDB"],
      bio: "Passionate about building scalable web applications.",
      image: "/uploads/u1.jpg",
    },
    {
      _id: "2",
      name: "Jane Smith",
      title: "UX Designer",
      location: "Los Angeles, USA",
      skills: ["Figma", "UI/UX", "Prototyping"],
      bio: "Creating seamless and beautiful user experiences.",
      image: "/uploads/p1.jpg",
    },
    {
      _id: "3",
      name: "David Johnson",
      title: "Data Scientist",
      location: "San Francisco, USA",
      skills: ["Python", "Machine Learning", "AI"],
      bio: "Transforming data into actionable insights.",
      image: "/uploads/u2.jpg",
    },
    {
      _id: "4",
      name: "John Mrcus",
      title: "Ai Engineer",
      location: "San Francisco, USA",
      skills: ["Python", "Machine Learning", "AI"],
      bio: "Transforming data into actionable insights.",
      image: "/uploads/d9.jpeg",
    },
    {
      _id: "5",
      name: "David Johnson",
      title: "Data Scientist",
      location: "San Francisco, USA",
      skills: ["Python", "Machine Learning", "AI"],
      bio: "Transforming data into actionable insights.",
      image: "/uploads/d3.jpeg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const startX = useRef(0);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleSwipe = (direction) => {
    setSwipeDirection(direction);

    const currentProfile = profiles[currentIndex];

    // Simulating a match condition for demo
    if (direction === "right" && Math.random() > 0.5) {
      toast.success(`It's a match with ${currentProfile.name}!`);
    }

    // Move to next profile with animation
    setTimeout(() => {
      if (currentIndex < profiles.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0); // Restart from the beginning
      }
      setSwipeDirection(null);
    }, 300);
  };

  // Touch event handlers for mobile swiping
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const diffX = endX - startX.current;

    if (Math.abs(diffX) > 50) {
      handleSwipe(diffX > 0 ? "right" : "left");
    }
  };

  if (profiles.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="mb-8 text-3xl font-bold">Discover Professionals</h1>
        <p className="text-xl text-gray-600">No profiles available.</p>
      </div>
    );
  }

  const currentProfile = profiles[currentIndex];

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer position="top-center" />
      <h1 className="mb-8 text-3xl font-bold text-center">Discover Professionals</h1>

      <div className="mx-auto max-w-md">
        <div
          className={`overflow-hidden transition-all duration-300 rounded-xl border shadow-lg
            ${swipeDirection === "left" ? "-translate-x-full opacity-0" : ""}
            ${swipeDirection === "right" ? "translate-x-full opacity-0" : ""}
          `}
          onTouchStart={isMobile ? handleTouchStart : undefined}
          onTouchEnd={isMobile ? handleTouchEnd : undefined}
        >
          <div className="relative h-64 w-full">
            <img
              src={currentProfile.image}
              alt={currentProfile.name}
              className="w-full h-full object-cover rounded-t-xl"
            />
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold">{currentProfile.name}</h2>
            <p className="text-gray-500">{currentProfile.title} • {currentProfile.location}</p>
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {currentProfile.skills.map((skill, index) => (
                  <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
              <p className="mt-2">{currentProfile.bio}</p>
            </div>
          </div>
          <div className="flex justify-between p-4 border-t">
            <button
              className="h-12 w-12 rounded-full border-2 border-red-500 text-red-500 flex items-center justify-center"
              onClick={() => handleSwipe("left")}
            >
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
                className="h-6 w-6"
              >
                <line x1="5" x2="19" y1="12" y2="12" />
              </svg>
              <span className="sr-only">Pass</span>
            </button>
            <button
              className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center"
              onClick={() => handleSwipe("right")}
            >
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
                className="h-6 w-6"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span className="sr-only">Connect</span>
            </button>
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>
            Profile {currentIndex + 1} of {profiles.length}
          </p>
          {isMobile && <p className="mt-2">Swipe left to pass, right to connect</p>}
        </div>
      </div>
    </div>
  );
};

// Custom hook for media queries
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

export default DiscoverPage;
