"use client";

import type { Film } from "@/lib/data";
import Link from "next/link";

const YOUTUBE_THUMB = (videoId: string) =>
  `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

type FilmCardProps = {
  film: Film;
  variant?: "default" | "compact";
};

export default function FilmCard({ film, variant = "default" }: FilmCardProps) {
  const href = `/films/${film.id}`;
  const trailerUrl = film.youtubeVideoId
    ? `https://www.youtube.com/watch?v=${film.youtubeVideoId}`
    : film.trailerUrl;
  const posterSrc = film.poster ?? (film.youtubeVideoId ? YOUTUBE_THUMB(film.youtubeVideoId) : null);

  if (variant === "compact") {
    return (
      <Link
        href={href}
        className="group flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 transition-all hover:border-amber/30 card-glow"
      >
        <div className="h-20 w-28 shrink-0 overflow-hidden rounded-lg poster-placeholder">
          {posterSrc ? (
            <img src={posterSrc} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="text-2xl">🎬</span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-white group-hover:text-amber transition-colors truncate">{film.titleRu}</h3>
          <p className="text-sm text-zinc-400">{film.releaseDate}</p>
          {film.ageRating && (
            <span className="mt-1 inline-block rounded bg-amber/20 px-2 py-0.5 text-xs font-medium text-amber">
              {film.ageRating}
            </span>
          )}
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] transition-all hover:border-amber/30 card-glow"
    >
      <div className="aspect-[2/3] w-full overflow-hidden poster-placeholder relative">
        {posterSrc ? (
          <img src={posterSrc} alt="" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
        ) : (
          <span className="text-6xl">🎬</span>
        )}
        {film.isNew && (
          <span className="absolute left-2 top-2 rounded bg-coral px-2 py-1 text-xs font-bold text-white">
            Новинка
          </span>
        )}
        {film.ageRating && (
          <span className="absolute right-2 top-2 rounded bg-black/60 px-2 py-1 text-xs font-medium">
            {film.ageRating}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-white group-hover:text-amber transition-colors line-clamp-2">
          {film.titleRu}
        </h3>
        <p className="mt-1 text-sm text-zinc-400">{film.releaseDate}</p>
        <p className="mt-1 text-sm text-zinc-500">{film.genre}</p>
        <div className="mt-3 flex gap-2">
          {trailerUrl ? (
            <a
              href={trailerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded bg-amber/15 px-2 py-1 text-xs text-amber hover:bg-amber/25"
              onClick={(e) => e.stopPropagation()}
            >
              Трейлер
            </a>
          ) : (
            <span className="rounded bg-amber/15 px-2 py-1 text-xs text-amber">Трейлер</span>
          )}
          <span className="rounded bg-white/10 px-2 py-1 text-xs text-zinc-400">Подробнее</span>
        </div>
      </div>
    </Link>
  );
}
