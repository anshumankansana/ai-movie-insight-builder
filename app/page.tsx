"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Sentiment {
  summary: string;
  classification: "Positive" | "Mixed" | "Negative";
}

interface MovieResponse {
  title: string;
  poster: string;
  year: string;
  rating: string;
  plot: string;
  cast: string;
  sentiment: Sentiment;
}

export default function Home() {
  const [imdbId, setImdbId] = useState("");
  const [data, setData] = useState<MovieResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovie = async () => {
    if (!/^tt\d{7,8}$/.test(imdbId)) {
      setError("Invalid IMDb ID format (Example: tt0133093)");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setData(null);

      const res = await fetch("/api/movie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imdbId }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error);

      setData(result);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchMovie();
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6 flex flex-col items-center">

      <h1 className="text-4xl font-bold mb-8 text-center">
        🎬 AI Movie Insight Builder
      </h1>

      <div className="flex gap-4 mb-6">
        <input
          value={imdbId}
          onChange={(e) => setImdbId(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter IMDb ID (tt0133093)"
          className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchMovie}
          disabled={loading}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      {error && (
        <div className="bg-red-900/50 border border-red-500 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      {loading && (
        <div className="animate-pulse bg-gray-800 w-full max-w-4xl h-64 rounded-xl" />
      )}

      {data && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl bg-gray-900/80 backdrop-blur-md p-6 rounded-2xl shadow-xl grid md:grid-cols-2 gap-6"
        >
          <div>
            <img
              src={data.poster !== "N/A" ? data.poster : "/placeholder.png"}
              alt={data.title}
              className="rounded-lg shadow-lg"
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold">{data.title}</h2>
            <p className="text-gray-400">
              {data.year} • IMDb {data.rating}
            </p>

            <p className="mt-4">{data.plot}</p>

            <p className="mt-3 text-sm text-gray-400">
              Cast: {data.cast}
            </p>

            <a
              href={`https://www.imdb.com/title/${imdbId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-blue-400 hover:underline"
            >
              View on IMDb →
            </a>

            <div className="mt-6 p-4 bg-gray-800 rounded-xl">
              <h3 className="font-semibold mb-2">AI Audience Sentiment</h3>
              <p className="text-sm">{data.sentiment.summary}</p>

              <span
                className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-semibold ${
                  data.sentiment.classification === "Positive"
                    ? "bg-green-600"
                    : data.sentiment.classification === "Negative"
                    ? "bg-red-600"
                    : "bg-yellow-600"
                }`}
              >
                {data.sentiment.classification}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </main>
  );
}