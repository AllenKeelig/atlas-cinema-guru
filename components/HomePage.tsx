"use client";

import MovieCard from "@/components/MovieCard";
import Pagination from "@/components/Pagination";
import { useMovies } from "@/hooks/useMovies";

export default function HomePage() {
  const {
    titles,
    genres,
    selectedGenres,
    search,
    minYear,
    maxYear,
    page,
    setSearch,
    setMinYear,
    setMaxYear,
    setPage,
    toggleGenre,
    toggleFavorite,
    toggleWatchLater,
  } = useMovies();

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
          <MovieCard
            key={movie.id}
            movie={movie}
            onToggleFavorite={toggleFavorite}
            onToggleWatchLater={toggleWatchLater}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination page={page} onPageChange={setPage} />
    </div>
  );
}
