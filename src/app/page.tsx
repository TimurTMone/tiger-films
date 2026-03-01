import Link from "next/link";
import { films, newsItems } from "@/lib/data";
import FilmCard from "@/components/FilmCard";
import NewsCard from "@/components/NewsCard";

const newReleases = films.filter((f) => f.isNew).slice(0, 5);
const latestNews = newsItems.slice(0, 3);

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative hero-gradient hero-gradient-warm grid-cinema overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="text-white">Создаём кино</span>
              <br />
              <span className="bg-gradient-to-r from-amber to-coral bg-clip-text text-transparent">
                для всей страны
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
              Продюсерская компания Tiger Films — полнометражное кино на базе Kinopark-Kinoplexx. 
              Комедии, драмы и семейное кино на казахском и русском языках.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/films" className="btn-primary">
                Наши фильмы
              </Link>
              <Link href="/cooperation" className="btn-secondary">
                Сотрудничество
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Новинки */}
      <section className="border-t border-[var(--border)] bg-[var(--background)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Наши новинки</h2>
            <Link href="/films" className="text-sm font-medium text-amber hover:underline">
              Все фильмы →
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {newReleases.map((film) => (
              <FilmCard key={film.id} film={film} />
            ))}
          </div>
        </div>
      </section>

      {/* О компании — кратко */}
      <section className="border-t border-[var(--border)] bg-[var(--card)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">О компании</h2>
              <p className="mt-4 text-zinc-400 leading-relaxed">
                Продюсерская компания Tiger Films была основана в 2021 году на базе кинотеатров 
                Kinopark-Kinoplexx Theatres в целях производства полнометражных фильмов. 
                Мы снимаем комедии, драмы и семейное кино для зрителей Казахстана и СНГ.
              </p>
              <Link href="/cooperation" className="mt-6 inline-block text-amber font-medium hover:underline">
                Узнать о сотрудничестве →
              </Link>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-8">
              <h3 className="text-lg font-semibold text-white">Партнёр</h3>
              <p className="mt-2 text-zinc-400">Our Media Group</p>
              <Link href="/contacts" className="mt-4 inline-block btn-secondary text-sm py-2">
                Контакты
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Последние новости */}
      <section className="border-t border-[var(--border)] bg-[var(--background)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Последние новости</h2>
            <Link href="/news" className="text-sm font-medium text-amber hover:underline">
              Все новости →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestNews.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
