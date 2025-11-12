"use client";

import { useState, useEffect } from "react";
import { Star, Clock } from "lucide-react";

export default function HomePage() {
  const [titles, setTitles] = useState<any[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [minYear, setMinYear] = useState(1900);
  const [maxYear, setMaxYear] = useState(new Date().getFullYear());
  const [page, setPage] = useState(1);

  // Load genres from the server
  useEffect(() => {
    async function loadGenres() {
      const res = await fetch("/api/genres");
      if (!res.ok) return console.error("Failed to load genres");
      const data = await res.json();
      setGenres(data.genres);
    }
    loadGenres();
  }, []);

  // Load titles based on filters
  useEffect(() => {
    async function loadTitles() {
      const params = new URLSearchParams({
        page: page.toString(),
        minYear: minYear.toString(),
        maxYear: maxYear.toString(),
        query: search,
      });

      if (selectedGenres.length) {
        params.append("genres", selectedGenres.join(","));
      }

      const res = await fetch(`/api/titles?${params.toString()}`);
      if (!res.ok) return console.error("Failed to load titles");
      const data = await res.json();

      setTitles(data.title);
    }
    loadTitles();
  }, [page, search, minYear, maxYear, selectedGenres]);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  const toggleFavorite = async (id: string, favorited: boolean) => {
    const res = await fetch(`/api/favorites`, {
      method: favorited ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title_id: id }),
    });

    if (res.ok) {
      setTitles((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, favorited: !favorited } : t
        )
      );
    }
  };

  const toggleWatchLater = async (id: string, watchLater: boolean) => {
    const res = await fetch(`/api/watchlater`, {
      method: watchLater ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title_id: id }),
    });

    if (res.ok) {
      setTitles((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, watchLater: !watchLater } : t
        )
      );
    }
  };

  return (
    <div className="flex flex-col h-full p-6 overflow-y-auto">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 rounded bg-white/10 border border-white/20 focus:outline-none"
        />
        <input
          type="number"
          placeholder="Min Year"
          value={minYear}
          onChange={(e) => setMinYear(Number(e.target.value))}
          className="px-3 py-2 rounded bg-white/10 border border-white/20 focus:outline-none w-24"
        />
        <input
          type="number"
          placeholder="Max Year"
          value={maxYear}
          onChange={(e) => setMaxYear(Number(e.target.value))}
          className="px-3 py-2 rounded bg-white/10 border border-white/20 focus:outline-none w-24"
        />

        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => toggleGenre(genre)}
              className={`px-3 py-1 rounded-full text-sm border ${
                selectedGenres.includes(genre)
                  ? "bg-teal-500 border-teal-400"
                  : "border-white/30 hover:bg-white/10"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {titles.map((movie) => (
          <div
            key={movie.id}
            className="relative group overflow-hidden rounded-lg bg-[#00003c] shadow-md border border-white/10"
          >
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
              <h2 className="text-lg font-semibold">{movie.title}</h2>
              <p className="text-sm opacity-80">{movie.synopsis}</p>
              <p className="text-xs opacity-70 mt-1">
                {movie.genre} • {movie.released}
              </p>

              <div className="flex justify-end gap-3 mt-3">
                <button
                  onClick={() => toggleFavorite(movie.id, movie.favorited)}
                >
                  {movie.favorited ? (
                    <Star className="fill-yellow-400 text-yellow-400" />
                  ) : (
                    <Star />
                  )}
                </button>
                <button
                  onClick={() => toggleWatchLater(movie.id, movie.watchLater)}
                >
                  {movie.watchLater ? (
                    <Clock className="fill-teal-400 text-teal-400" />
                  ) : (
                    <Clock />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-500 disabled:opacity-40 rounded"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
