"use client";

import { useState } from "react";
import { teamMembers, getTeamByRole } from "@/lib/data";
import type { TeamMember } from "@/lib/data";
import TeamCard from "@/components/TeamCard";

const tabs: { key: TeamMember["role"]; label: string }[] = [
  { key: "director", label: "Режиссёры" },
  { key: "cinematographer", label: "Операторы" },
  { key: "artist", label: "Художники" },
];

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState<TeamMember["role"]>("director");
  const list = getTeamByRole(activeTab);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white">Команда</h1>
      <p className="mt-2 text-zinc-400">
        Режиссёры, операторы и художники-постановщики Tiger Films.
      </p>

      {/* Табы */}
      <div className="mt-8 flex flex-wrap gap-2 border-b border-[var(--border)] pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-amber text-black"
                : "text-zinc-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.length > 0 ? (
          list.map((member) => <TeamCard key={member.id} member={member} />)
        ) : (
          <div className="col-span-full rounded-xl border border-[var(--border)] bg-[var(--card)] p-12 text-center text-zinc-500">
            В этой категории пока нет участников.
          </div>
        )}
      </div>

      {/* Все участники — сводка */}
      <section className="mt-16 border-t border-[var(--border)] pt-12">
        <h2 className="text-xl font-bold text-white">Вся команда</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4"
            >
              <div className="h-12 w-12 shrink-0 rounded-full poster-placeholder flex items-center justify-center text-xl">
                👤
              </div>
              <div>
                <p className="font-medium text-white">{member.name}</p>
                <p className="text-sm text-amber">{member.roleLabel}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
