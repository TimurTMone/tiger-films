"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { aboutCompany, leadershipTeam, getLeadershipName, getLeadershipRole } from "@/lib/data";

export default function AboutPage() {
  const { lang } = useLanguage();
  const content = aboutCompany[lang];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white">{content.title}</h1>

      <section className="mt-8 space-y-6">
        <p className="text-zinc-300 leading-relaxed">{content.paragraph1}</p>
        <p className="text-zinc-300 leading-relaxed">{content.paragraph2}</p>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-bold text-white">{content.teamTitle}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {leadershipTeam.map((member) => (
            <div
              key={member.id}
              className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 text-center transition-all hover:border-amber/30 card-glow"
            >
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-amber/10 text-3xl text-amber">
                👤
              </div>
              <h3 className="font-semibold text-white">{getLeadershipName(member, lang)}</h3>
              <p className="mt-1 text-sm text-amber">{getLeadershipRole(member, lang)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
