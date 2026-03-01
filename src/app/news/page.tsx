"use client";

import Link from "next/link";
import { newsItems } from "@/lib/data";
import NewsCard from "@/components/NewsCard";
import { useLanguage } from "@/contexts/LanguageContext";

const titles = {
  ru: { h1: "Новостная хроника", p: "Пресс-релизы, премьеры и события Tiger Films.", back: "Все новости" },
  kz: { h1: "Жаңалықтар шежіресі", p: "Tiger Films пресс-релиздері, премьералар мен оқиғалар.", back: "Барлық жаңалықтар" },
  en: { h1: "News", p: "Press releases, premieres and events from Tiger Films.", back: "All news" },
};

export default function NewsPage() {
  const { lang } = useLanguage();
  const t = titles[lang];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white">{t.h1}</h1>
      <p className="mt-2 text-zinc-400">{t.p}</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {newsItems.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
