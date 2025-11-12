"use client";

import MovieCard from "@/components/MovieCard";
import Pagination from "@/components/Pagination";
import { useMovies } from "@/hooks/useMovies";
import { useEffect, useState } from "react";

export default function FavoritesClient() {
  const {
    toggleFavorite,
    toggleWatchLater,
    page,
    setPage,
  } = useMovies();

  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFavorites() {
      try {
        setLoading(true);
        const res = await fetch(`/api/favorites?page=${page}`);
        if (!res.ok) throw new Error("Failed to load favorites");

        const data = await res.json();
        setFavorites(data.favorites || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadFavorites();
  }, [page]);

  return (
    <div className="flex flex-col h-full p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold mb-6">Your Favorites</h1>

      {loading ? (
        <p className="text-center opacity-70 mt-20">Loading...</p>
      ) : favorites.length === 0 ? (
        <p className="text-center opacity-70 mt-20">No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onToggleFavorite={toggleFavorite}
              onToggleWatchLater={toggleWatchLater}
            />
          ))}
        </div>
      )}

      {/* Always show pagination */}
      <Pagination page={page} onPageChange={setPage} />
    </div>
  );
}
