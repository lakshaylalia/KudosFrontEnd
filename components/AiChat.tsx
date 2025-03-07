"use client";
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("YOUR_FREE_API_KEY");

export default function AiChat() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAskAI() {
    if (!query.trim()) return;
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(query);
      setResponse(result.response.text());
    } catch (error) {
      console.error("Error fetching Gemini response:", error);
      setResponse("Sorry, something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Ask Gemini</h2>
      <input
        type="text"
        placeholder="How can I earn Kudos?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleAskAI}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? "Thinking..." : "Ask Gemini"}
      </button>
      {response && (
        <p className="mt-3 text-gray-700 bg-white p-3 rounded shadow">{response}</p>
      )}
    </div>
  );
}
