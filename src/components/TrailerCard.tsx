"use client";

import type { Trailer } from "@/lib/data";
import Link from "next/link";

const YOUTUBE_THUMB = (videoId: string, quality: "maxres" | "hq" = "hq") =>
  quality === "maxres"
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

type TrailerCardProps = {
  trailer: Trailer;
};

export default function TrailerCard({ trailer }: TrailerCardProps) {
  const watchUrl = `https://www.youtube.com/watch?v=${trailer.videoId}`;

  return (
    <div className="group overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] transition-all hover:border-amber/30 card-glow">
      <a href={watchUrl} target="_blank" rel="noopener noreferrer" className="block">
        <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
          <img
            src={YOUTUBE_THUMB(trailer.videoId)}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src.includes("maxresdefault")) target.src = YOUTUBE_THUMB(trailer.videoId, "hq");
            }}
          />
          <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40 pointer-events-none" aria-hidden>
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform group-hover:scale-110">
              <svg className="ml-1 h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
          <span className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-0.5 text-xs text-white">YouTube</span>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-white group-hover:text-amber transition-colors line-clamp-2">
            {trailer.title}
          </h3>
        </div>
      </a>
      {trailer.filmId && (
        <div className="px-4 pb-4">
          <Link href={`/films/${trailer.filmId}`} className="text-sm text-amber hover:underline">
            Подробнее о фильме →
          </Link>
        </div>
      )}
    </div>
  );
}
