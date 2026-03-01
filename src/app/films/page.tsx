"use client";

import { useState, useMemo } from "react";
import { films, trailers, searchFilms } from "@/lib/data";
import FilmCard from "@/components/FilmCard";
import TrailerCard from "@/components/TrailerCard";

export default function FilmsPage() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchFilms(query), [query]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white">Наши фильмы</h1>
      <p className="mt-2 text-zinc-400">
        Полнометражные фильмы Tiger Films. Поиск по названию и жанру.
      </p>

      {/* Trailers from YouTube @kztigerfilms */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-white">Трейлеры</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Официальные трейлеры с канала{" "}
          <a
            href="https://www.youtube.com/@kztigerfilms/videos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber hover:underline"
          >
            Tiger Films на YouTube
          </a>
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {trailers.map((trailer) => (
            <TrailerCard key={`${trailer.videoId}-${trailer.title}`} trailer={trailer} />
          ))}
        </div>
      </section>

      {/* Поиск */}
      <section className="mt-14">
        <h2 className="text-xl font-bold text-white">Каталог фильмов</h2>
      <div className="mt-8">
        <label htmlFor="film-search" className="sr-only">Поиск фильмов</label>
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">🔍</span>
          <input
            id="film-search"
            type="search"
            placeholder="Название фильма или жанр..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] py-3 pl-11 pr-4 text-white placeholder-zinc-500 focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
              aria-label="Очистить"
            >
              ✕
            </button>
          )}
        </div>
        <p className="mt-2 text-sm text-zinc-500">
          Найдено: {results.length} {results.length === 1 ? "фильм" : results.length < 5 ? "фильма" : "фильмов"}
        </p>
      </div>

      {/* Результаты */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {results.length > 0 ? (
          results.map((film) => <FilmCard key={film.id} film={film} />)
        ) : (
          <div className="col-span-full rounded-xl border border-[var(--border)] bg-[var(--card)] p-12 text-center text-zinc-500">
            По вашему запросу ничего не найдено. Попробуйте другое название или жанр.
          </div>
        )}
      </div>
      </section>
    </div>
  );
}
