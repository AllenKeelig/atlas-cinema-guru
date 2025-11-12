"use client";

import { useState, useEffect } from "react";

export function useMovies() {
  const [titles, setTitles] = useState<any[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [minYear, setMinYear] = useState(1900);
  const [maxYear, setMaxYear] = useState(new Date().getFullYear());
  const [page, setPage] = useState(1);

  // Load genres
  useEffect(() => {
    async function loadGenres() {
      const res = await fetch("/api/genres");
      if (!res.ok) return console.error("Failed to load genres");
      const data = await res.json();
      setGenres(data.genres);
    }
    loadGenres();
  }, []);

  // Load titles
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
  const res = await fetch(`/api/favorites/${id}`, {
    method: favorited ? "DELETE" : "POST",
  });

  if (res.ok) {
    setTitles((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, favorited: !favorited } : t
      )
    );
  } else {
      console.error("Failed to toggle favorite", await res.text());
    }
  };

const toggleWatchLater = async (id: string, watchLater: boolean) => {
  const res = await fetch(`/api/watch-later/${id}`, {
    method: watchLater ? "DELETE" : "POST",
  });

  if (res.ok) {
    setTitles((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, watchLater: !watchLater } : t
      )
    );
    } else {
      console.error("Failed to toggle watch later", await res.text());
    }
  };


  return {
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
  };
}
