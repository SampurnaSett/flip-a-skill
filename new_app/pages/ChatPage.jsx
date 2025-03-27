"use client"

import { useState, useRef, useEffect } from "react"

const ChatPage = () => {
  const [message, setMessage] = useState("")
  const messagesEndRef = useRef(null)

  // Mock Chat Data
  const chat = {
    user: {
      name: "John Doe",
      title: "Software Engineer",
      image: "https://via.placeholder.com/100x100",
    },
    messages: [
      { _id: 1, sender: "John Doe", text: "Hey, how are you?", timestamp: "10:00 AM" },
      { _id: 2, sender: "you", text: "I'm good! How about you?", timestamp: "10:02 AM" },
      { _id: 3, sender: "John Doe", text: "Doing well, just working on a project.", timestamp: "10:05 AM" },
    ],
  }

  useEffect(() => {
    scrollToBottom()
  }, [chat.messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (!message.trim()) return

    // Update local state with new message
    chat.messages.push({
      _id: chat.messages.length + 1,
      sender: "you",
      text: message,
      timestamp: new Date().toLocaleTimeString(),
    })

    setMessage("")
    scrollToBottom()
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="container mx-auto flex h-[calc(100vh-4rem)] flex-col px-4 py-6">
      <div className="flex h-full flex-col">
        {/* Chat Header */}
        <div className="mb-4 flex items-center gap-3">
          <div className="relative h-10 w-10">
            <img src={chat.user.image} alt={chat.user.name} className="rounded-full object-cover h-full w-full" />
          </div>
          <div>
            <h2 className="font-semibold">{chat.user.name}</h2>
            <p className="text-sm text-gray-500">{chat.user.title}</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 space-y-4 overflow-y-auto rounded-lg border bg-gray-50 p-4">
          {chat.messages.map((msg) => (
            <div key={msg._id} className={`flex ${msg.sender === "you" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] px-4 py-3 rounded-lg ${
                  msg.sender === "you" ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                <p>{msg.text}</p>
                <p className={`mt-1 text-right text-xs ${msg.sender === "you" ? "text-blue-100" : "text-gray-500"}`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="mt-4 flex gap-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-blue-300"
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
              className="h-5 w-5"
            >
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
            <span className="sr-only">Send</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatPage
