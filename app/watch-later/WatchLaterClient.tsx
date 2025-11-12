"use client";

import MovieCard from "@/components/MovieCard";
import Pagination from "@/components/Pagination";
import { useMovies } from "@/hooks/useMovies";
import { useEffect, useState } from "react";

export default function WatchLaterClient() {
  const {
    toggleFavorite,
    toggleWatchLater,
    page,
    setPage,
  } = useMovies();

  const [watchLaterList, setWatchLaterList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWatchLater() {
      try {
        setLoading(true);
        const res = await fetch(`/api/watch-later?page=${page}`);
        if (!res.ok) throw new Error("Failed to load watch later");

        const data = await res.json();
        setWatchLaterList(data.watchLater || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadWatchLater();
  }, [page]);

  return (
    <div className="flex flex-col h-full p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold mb-6">Watch Later</h1>

      {loading ? (
        <p className="text-center opacity-70 mt-20">Loading...</p>
      ) : watchLaterList.length === 0 ? (
        <p className="text-center opacity-70 mt-20">No titles in your Watch Later list.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {watchLaterList.map((movie) => (
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
