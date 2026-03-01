import type { Film } from "@/lib/data";
import Link from "next/link";

type FilmCardProps = {
  film: Film;
  variant?: "default" | "compact";
};

export default function FilmCard({ film, variant = "default" }: FilmCardProps) {
  const href = `/films/${film.id}`;

  if (variant === "compact") {
    return (
      <Link
        href={href}
        className="group flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 transition-all hover:border-amber/30 card-glow"
      >
        <div className="h-20 w-28 shrink-0 overflow-hidden rounded-lg poster-placeholder">
          {film.poster ? (
            <img src={film.poster} alt="" className="h-full w-full object-cover" />
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
        {film.poster ? (
          <img src={film.poster} alt="" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
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
          <span className="rounded bg-amber/15 px-2 py-1 text-xs text-amber">Трейлер</span>
          <span className="rounded bg-white/10 px-2 py-1 text-xs text-zinc-400">Подробнее</span>
        </div>
      </div>
    </Link>
  );
}
