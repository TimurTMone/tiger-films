"use client";

import Image from "next/image";
import { Actor, getActorAge } from "@/lib/data";

type ActorCardProps = {
  actor: Actor;
  onSelect: (actor: Actor) => void;
};

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((s) => s[0])
    .join("")
    .toUpperCase();
}

export default function ActorCard({ actor, onSelect }: ActorCardProps) {
  const age = getActorAge(actor.birthDate);
  const photoUrl =
    actor.photoProfile || actor.photoFullFace || actor.photoFullBody;
  const placeholderAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(actor.name)}&size=400&background=2a2a2e&color=f59e0b`;

  return (
    <button
      type="button"
      onClick={() => onSelect(actor)}
      className="group flex w-full flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] text-left transition-all duration-200 hover:border-amber/40 hover:shadow-[0_0_32px_-8px_rgba(245,158,11,0.2)] focus:outline-none focus:ring-2 focus:ring-amber/50 focus:ring-offset-2 focus:ring-offset-[var(--background)]"
    >
      {/* Photo or avatar */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[var(--card-hover)]">
        {photoUrl ? (
          <>
            <Image
              src={photoUrl}
              alt={actor.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) {
                  fallback.classList.remove("hidden");
                  fallback.classList.add("flex");
                }
              }}
            />
            <div className="hidden absolute inset-0 flex items-center justify-center bg-gradient-to-t from-[var(--card)]/90 via-[var(--card)]/20 to-transparent">
              <span className="text-2xl font-bold text-white drop-shadow-lg">
                {initials(actor.name)}
              </span>
            </div>
          </>
        ) : (
          <Image
            src={placeholderAvatar}
            alt=""
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
        {/* Gender badge */}
        <span className="absolute right-2 top-2 rounded-md bg-black/60 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
          {actor.gender === "male" ? "М" : "Ж"}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="line-clamp-2 font-semibold text-white group-hover:text-amber">
          {actor.name}
        </h3>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-zinc-400">
          <span>{actor.city}</span>
          {age != null && (
            <>
              <span aria-hidden className="text-zinc-600">
                •
              </span>
              <span>{age} лет</span>
            </>
          )}
        </div>
        {(actor.appearanceType || actor.languages) && (
          <div className="mt-1 flex flex-wrap gap-1.5">
            {actor.appearanceType && (
              <span className="rounded-full bg-amber/10 px-2 py-0.5 text-xs text-amber">
                {actor.appearanceType}
              </span>
            )}
            {actor.languages && (
              <span className="rounded-full bg-teal/10 px-2 py-0.5 text-xs text-teal">
                {actor.languages.split(/[,/]/)[0]?.trim() || actor.languages}
              </span>
            )}
          </div>
        )}
      </div>
    </button>
  );
}
