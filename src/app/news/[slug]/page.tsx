"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { getNewsBySlug, getNewsTitle, getNewsExcerpt, getNewsBody } from "@/lib/data";
import { useLanguage } from "@/contexts/LanguageContext";
import NewsComments from "./NewsComments";
import { getCommentsForNews } from "@/lib/data";

const readMoreLabel = { ru: "Читать на tigerfilms.kz →", kz: "tigerfilms.kz сайтында оқу →", en: "Read on tigerfilms.kz →" };
const backLabel = { ru: "← Все новости", kz: "← Барлық жаңалықтар", en: "← All news" };
const commentsTitle = { ru: "Комментарии", kz: "Пікірлер", en: "Comments" };

export default function NewsSlugPage() {
  const params = useParams();
  const slug = params.slug as string;
  const news = getNewsBySlug(slug);
  const { lang } = useLanguage();

  if (!news) notFound();

  const title = getNewsTitle(news, lang);
  const excerpt = getNewsExcerpt(news, lang);
  const body = getNewsBody(news, lang);
  const initialComments = getCommentsForNews(slug);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/news" className="text-sm text-amber hover:underline">{backLabel[lang]}</Link>
      <article className="mt-8">
        <time className="text-zinc-500">{news.date}</time>
        <h1 className="mt-2 text-3xl font-bold text-white">{title}</h1>
        {news.image && (
          <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-xl bg-[var(--card-hover)]">
            <Image
              src={news.image}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
              priority
            />
          </div>
        )}
        {body && (
          <div className="mt-6 prose prose-invert max-w-none">
            <p className="text-zinc-300 leading-relaxed whitespace-pre-line">{body}</p>
          </div>
        )}
        {!body && <p className="mt-4 text-zinc-300 leading-relaxed">{excerpt}</p>}
        {news.sourceUrl && (
          <p className="mt-6">
            <a
              href={news.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber hover:underline"
            >
              {readMoreLabel[lang]}
            </a>
          </p>
        )}

        <section className="mt-12 border-t border-[var(--border)] pt-8">
          <h2 className="text-xl font-bold text-white">{commentsTitle[lang]}</h2>
          <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
            <NewsComments newsSlug={slug} initialComments={initialComments} />
          </div>
        </section>
      </article>
    </div>
  );
}
