import type { TeamMember } from "@/lib/data";

export default function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden transition-all hover:border-amber/30 card-glow">
      <div className="aspect-square w-full poster-placeholder">
        {member.photo ? (
          <img src={member.photo} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="text-5xl">👤</span>
        )}
      </div>
      <div className="p-4">
        <span className="text-xs font-medium uppercase tracking-wider text-amber">{member.roleLabel}</span>
        <h3 className="mt-1 font-semibold text-white">{member.name}</h3>
        {member.bio && <p className="mt-2 text-sm text-zinc-400 line-clamp-2">{member.bio}</p>}
        <p className="mt-2 text-xs text-zinc-500">
          Фильмы: {member.films.slice(0, 2).join(", ")}
          {member.films.length > 2 ? "…" : ""}
        </p>
      </div>
    </div>
  );
}
