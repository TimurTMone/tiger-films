import Link from "next/link";
import { newsItems } from "@/lib/data";
import NewsCard from "@/components/NewsCard";

export default function NewsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white">Новостная хроника</h1>
      <p className="mt-2 text-zinc-400">
        Пресс-релизы, премьеры и события Tiger Films.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {newsItems.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
