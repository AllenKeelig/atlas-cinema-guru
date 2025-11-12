"use client";

import { Star, Clock } from "lucide-react";

type Movie = {
  id: string;
  title: string;
  synopsis: string;
  genre: string;
  released: number;
  image: string;
  favorited: boolean;
  watchLater: boolean;
};

type Props = {
  movie: Movie;
  onToggleFavorite: (id: string, favorited: boolean) => Promise<void>;
  onToggleWatchLater: (id: string, watchLater: boolean) => Promise<void>;
};

export default function MovieCard({ movie, onToggleFavorite, onToggleWatchLater }: Props) {
  return (
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
        <p className="text-sm opacity-80 line-clamp-3">{movie.synopsis}</p>
        <p className="text-xs opacity-70 mt-1">
          {movie.genre} • {movie.released}
        </p>

        <div className="flex justify-end gap-3 mt-3">
          <button onClick={() => onToggleFavorite(movie.id, movie.favorited)}>
            {movie.favorited ? (
              <Star className="fill-yellow-400 text-yellow-400" />
            ) : (
              <Star />
            )}
          </button>
          <button onClick={() => onToggleWatchLater(movie.id, movie.watchLater)}>
            {movie.watchLater ? (
              <Clock className="fill-teal-400 text-teal-400" />
            ) : (
              <Clock />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
