"use client";

import type { NewsItem } from "@/lib/data";
import type { Lang } from "@/lib/data";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { getNewsTitle, getNewsExcerpt } from "@/lib/data";

export default function NewsCard({ item }: { item: NewsItem }) {
  const { lang } = useLanguage();
  const title = getNewsTitle(item, lang);
  const excerpt = getNewsExcerpt(item, lang);

  const readMore = { ru: "Читать далее →", kz: "Оқу →", en: "Read more →" };
  const commentsLabel = { ru: "комментариев", kz: "пікір", en: "comments" };

  return (
    <article className="rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden transition-all hover:border-amber/30 card-glow">
      <Link href={`/news/${item.slug}`} className="block">
        <div className="aspect-video w-full poster-placeholder">
          {item.image ? (
            <img src={item.image} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="text-4xl">📰</span>
          )}
        </div>
        <div className="p-4">
          <time className="text-sm text-zinc-500">{item.date}</time>
          <h3 className="mt-1 font-semibold text-white hover:text-amber transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="mt-2 text-sm text-zinc-400 line-clamp-2">{excerpt}</p>
          <p className="mt-2 text-sm text-amber">
            {readMore[lang]}
          </p>
          {item.commentsCount > 0 && (
            <p className="mt-1 text-xs text-zinc-500">
              {item.commentsCount} {commentsLabel[lang]}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
}
