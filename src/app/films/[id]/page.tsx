import { notFound } from "next/navigation";
import Link from "next/link";
import { films } from "@/lib/data";

const YOUTUBE_THUMB = (videoId: string) =>
  `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

export default function FilmPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const film = films.find((f) => f.id === id);
  if (!film) notFound();

  const posterSrc = film.poster ?? (film.youtubeVideoId ? YOUTUBE_THUMB(film.youtubeVideoId) : null);
  const trailerUrl = film.youtubeVideoId
    ? `https://www.youtube.com/watch?v=${film.youtubeVideoId}`
    : film.trailerUrl;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/films" className="text-sm text-amber hover:underline">← Назад к фильмам</Link>
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="aspect-[2/3] w-full max-w-sm overflow-hidden rounded-xl poster-placeholder">
            {posterSrc ? (
              <img src={posterSrc} alt={film.titleRu} className="h-full w-full object-cover" />
            ) : (
              <span className="text-8xl">🎬</span>
            )}
          </div>
          <div className="mt-4 flex gap-2">
            {trailerUrl && (
              <a
                href={trailerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded bg-amber/20 px-3 py-1.5 text-sm font-medium text-amber hover:bg-amber/30"
              >
                Трейлер
              </a>
            )}
          </div>
        </div>
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold text-white">{film.titleRu}</h1>
          {film.titleKz && <p className="mt-1 text-xl text-zinc-400">{film.titleKz}</p>}
          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-zinc-500">Дата выхода</dt>
              <dd className="font-medium text-white">{film.releaseDate}</dd>
            </div>
            <div>
              <dt className="text-sm text-zinc-500">Жанр</dt>
              <dd className="font-medium text-white">{film.genre}</dd>
            </div>
            {film.duration && (
              <div>
                <dt className="text-sm text-zinc-500">Продолжительность</dt>
                <dd className="font-medium text-white">{film.duration}</dd>
              </div>
            )}
            <div>
              <dt className="text-sm text-zinc-500">Возраст</dt>
              <dd className="font-medium text-white">{film.ageRating || "—"}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm text-zinc-500">Язык</dt>
              <dd className="font-medium text-white">{film.language}</dd>
            </div>
          </dl>
          {film.description && (
            <div className="mt-8 border-t border-[var(--border)] pt-6">
              <h2 className="text-lg font-semibold text-white">Краткое содержание</h2>
              <p className="mt-3 text-zinc-400 leading-relaxed">{film.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
