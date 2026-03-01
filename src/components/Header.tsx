"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const navItems: { href: string; labelRu: string; labelKz: string; labelEn: string }[] = [
  { href: "/", labelRu: "Главная", labelKz: "Басты бет", labelEn: "Home" },
  { href: "/films", labelRu: "Наши фильмы", labelKz: "Біздің фильмдер", labelEn: "Our Films" },
  { href: "/about", labelRu: "О компании", labelKz: "Компания туралы", labelEn: "About Us" },
  { href: "/team", labelRu: "Команда", labelKz: "Команда", labelEn: "Team" },
  { href: "/actors", labelRu: "База актёров", labelKz: "Актерлер базасы", labelEn: "Actors" },
  { href: "/news", labelRu: "Новости", labelKz: "Жаңалықтар", labelEn: "News" },
  { href: "/cooperation", labelRu: "Сотрудничество", labelKz: "Ынтымақтастық", labelEn: "Cooperation" },
  { href: "/contacts", labelRu: "Контакты", labelKz: "Байланыс", labelEn: "Contacts" },
];

const langLabels: Record<string, string> = { ru: "Русский", kz: "Қазақ", en: "English" };

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { lang, setLang } = useLanguage();

  const navLabel = (item: (typeof navItems)[0]) => {
    if (lang === "kz") return item.labelKz;
    if (lang === "en") return item.labelEn;
    return item.labelRu;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/tiger-films-logo.png"
            alt="Tiger Films"
            width={160}
            height={48}
            className="h-10 w-auto sm:h-12"
            priority
          />
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
                {navLabel(item)}
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
              {langLabels[lang]} ▾
            </button>
            {langOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} />
                <ul className="absolute right-0 top-full z-20 mt-1 w-40 rounded-lg border border-[var(--border)] bg-[var(--card)] py-1 shadow-xl">
                  <li><button type="button" onClick={() => { setLang("ru"); setLangOpen(false); }} className="w-full px-4 py-2 text-left text-sm hover:bg-white/5">Русский</button></li>
                  <li><button type="button" onClick={() => { setLang("kz"); setLangOpen(false); }} className="w-full px-4 py-2 text-left text-sm hover:bg-white/5">Қазақ</button></li>
                  <li><button type="button" onClick={() => { setLang("en"); setLangOpen(false); }} className="w-full px-4 py-2 text-left text-sm hover:bg-white/5">English</button></li>
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
                {navLabel(item)}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
