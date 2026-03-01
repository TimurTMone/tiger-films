import Link from "next/link";
import { notFound } from "next/navigation";
import { getNewsBySlug, getCommentsForNews } from "@/lib/data";
import NewsComments from "./NewsComments";

export default function NewsSlugPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const news = getNewsBySlug(slug);
  if (!news) notFound();
  const initialComments = getCommentsForNews(slug);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/news" className="text-sm text-amber hover:underline">← Все новости</Link>
      <article className="mt-8">
        <time className="text-zinc-500">{news.date}</time>
        <h1 className="mt-2 text-3xl font-bold text-white">{news.title}</h1>
        <p className="mt-4 text-zinc-300 leading-relaxed">{news.excerpt}</p>
        <p className="mt-4 text-zinc-500 text-sm">
          Полный текст пресс-релиза можно разместить здесь или подгружать из CMS.
        </p>

        <section className="mt-12 border-t border-[var(--border)] pt-8">
          <h2 className="text-xl font-bold text-white">Комментарии</h2>
          <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
            <NewsComments newsSlug={slug} initialComments={initialComments} />
          </div>
        </section>
      </article>
    </div>
  );
}
