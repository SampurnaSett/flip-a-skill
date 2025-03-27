import React from "react";

const AboutUs = () => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Heading Section */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        🔄 Learn. Teach. Grow.
      </h1>
      <p className="text-lg text-center text-gray-600 mb-10">
        Welcome to <strong>Flip-a-Skill</strong>, a unique skill exchange platform 
        where you can <span className="text-blue-500 font-semibold">learn from others</span> 
        and <span className="text-green-500 font-semibold">share your expertise</span>. 
        Whether you're an artist, a tech enthusiast, or a fitness buff, join us to 
        **flip** your talents and grow together! 🌍
      </p>

      {/* Skill Categories */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((category, index) => (
          <div key={index} className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
              {category.icon} {category.name}
            </h2>
            <ul className="list-disc pl-4 text-gray-600">
              {category.skills.map((skill, i) => (
                <li key={i} className="mb-1">{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

// Skill Categories Data
const skills = [
  {
    name: "🎨 Creative & Artistic",
    icon: "🖌️",
    skills: ["Painting", "Graphic Design", "Photography", "Video Editing", "Calligraphy", "DIY Crafts"],
  },
  {
    name: "📚 Academic & Learning",
    icon: "📖",
    skills: ["Language Learning", "Public Speaking", "Writing", "Math & Science Tutoring", "Research Skills"],
  },
  {
    name: "💻 Digital & Tech",
    icon: "💻",
    skills: ["Coding", "Web & App Development", "UI/UX Design", "Cybersecurity", "Data Analysis", "Digital Marketing"],
  },
  {
    name: "📈 Business & Professional",
    icon: "🚀",
    skills: ["Entrepreneurship", "Financial Planning", "Resume Building", "Leadership", "Communication"],
  },
  {
    name: "💪 Fitness & Wellness",
    icon: "🏋️",
    skills: ["Yoga", "Strength Training", "Dance", "Self-Defense"],
  },
  {
    name: "🎭 Music & Performing Arts",
    icon: "🎶",
    skills: ["Singing", "Playing Instruments", "Acting", "Theater"],
  }
];

export default AboutUs;
