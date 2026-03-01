"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Главная" },
  { href: "/films", label: "Наши фильмы" },
  { href: "/team", label: "Команда" },
  { href: "/actors", label: "База актёров" },
  { href: "/news", label: "Новости" },
  { href: "/cooperation", label: "Сотрудничество" },
  { href: "/contacts", label: "Контакты" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight">
            <span className="text-[var(--amber)]">Tiger</span>
            <span className="text-white"> Films</span>
          </span>
          <span className="text-[var(--amber)]" aria-hidden>🐯</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                pathname === item.href
                  ? "bg-amber/15 text-amber"
                  : "text-zinc-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 rounded-lg border border-[var(--border)] px-3 py-2 text-sm text-zinc-300 hover:bg-white/5"
              aria-expanded={langOpen}
            >
              Русский ▾
            </button>
            {langOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} />
                <ul className="absolute right-0 top-full z-20 mt-1 w-40 rounded-lg border border-[var(--border)] bg-[var(--card)] py-1 shadow-xl">
                  <li><Link href="#" className="block px-4 py-2 text-sm hover:bg-white/5">Қазақ</Link></li>
                  <li><Link href="#" className="block px-4 py-2 text-sm hover:bg-white/5">English</Link></li>
                </ul>
              </>
            )}
          </div>

          <button
            type="button"
            className="md:hidden rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Меню"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-[var(--border)] bg-[var(--card)] md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium ${
                  pathname === item.href ? "bg-amber/15 text-amber" : "text-zinc-300"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
