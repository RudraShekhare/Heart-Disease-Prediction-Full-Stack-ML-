import React, { useState, useEffect, useRef } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today? 😊", sender: "bot" },
  ]);
  const [userMessage, setUserMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [loading, setLoading] = useState(false); // Loading state

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle user message submission
  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;
    setLoading(true);

    const newMessage = { text: userMessage, sender: "user" };
    setMessages((prev) => [...prev, newMessage]);
    setUserMessage("");

    try {
      const response = await fetch("http://127.0.0.1:5000/gemini_chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error("Server Error");

      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.response, sender: "bot" }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ Error: Unable to get a response.", sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Handle "Enter" key press to send message
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) handleSendMessage();
  };

  return (
    <div className="fixed bottom-5 right-5 w-96 bg-white shadow-lg rounded-lg p-4 border border-gray-300">
      <h3 className="text-xl font-semibold mb-3 text-center">
        👩‍⚕️🩺 Dr. Chatbot
      </h3>

      {/* Chat messages */}
      <div className="h-60 overflow-y-auto border p-3 bg-gray-100 rounded-lg">
        {messages.map((msg, index) => (
          <p
            key={index}
            className={`mb-2 p-2 rounded-lg ${
              msg.sender === "bot"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-300 text-black self-end"
            }`}
          >
            {msg.text}
          </p>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* User input field */}
      <div className="mt-3 flex">
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none"
          disabled={loading}
        />
        <button
          onClick={handleSendMessage}
          className={`ml-2 px-4 py-2 rounded-lg shadow-lg ${
            loading ? "bg-gray-400" : "bg-blue-600 text-white"
          }`}
          disabled={loading || !userMessage.trim()}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
