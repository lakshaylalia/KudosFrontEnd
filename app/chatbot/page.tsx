"use client";
import { useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const apiUrl = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent";

export default function AiChat() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAskAI() {
    if (!query.trim()) return;
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch(`${apiUrl}?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: query }] }],
        }),
      });

      const data = await res.json();

      if (res.ok && data.candidates) {
        setResponse(data.candidates[0].content.parts[0].text);
      } else {
        console.error("API Error:", data);
        setResponse("⚠️ Sorry, something went wrong. Try again.");
      }
    } catch (error) {
      console.error("Error fetching Gemini response:", error);
      setResponse("⚠️ Sorry, something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg w-full max-w-md mx-auto border border-gray-300">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">💬 Ask Gemini AI</h2>
      <input
        type="text"
        placeholder="Ask me anything..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleAskAI}
        className={`mt-2 w-full px-4 py-2 rounded text-white transition ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
        disabled={loading}
      >
        {loading ? "Thinking..." : "Ask Gemini"}
      </button>
      {response && (
        <p className="mt-3 text-gray-700 bg-gray-100 p-3 rounded shadow">{response}</p>
      )}
    </div>
  );
}
