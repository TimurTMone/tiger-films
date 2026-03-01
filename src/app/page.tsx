import Link from "next/link";
import { films, newsItems, trailers } from "@/lib/data";
import FilmCard from "@/components/FilmCard";
import NewsCard from "@/components/NewsCard";
import TrailerCard from "@/components/TrailerCard";

const newReleases = films.filter((f) => f.isNew).slice(0, 5);
const latestNews = newsItems.slice(0, 3);
const featuredTrailers = trailers.slice(0, 4);

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden hero-gradient">
        {/* YouTube background video */}
        <div className="absolute inset-0 z-0">
          <iframe
            title="Hero background"
            src="https://www.youtube.com/embed/JHcSDqF7Nzc?autoplay=1&mute=1&loop=1&playlist=JHcSDqF7Nzc&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
            className="absolute left-1/2 top-1/2 min-h-[100vh] min-w-[177.78vh] w-[100vw] h-[56.25vw] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/60 hero-gradient-warm" aria-hidden />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 w-full">
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
          {/* Трейлеры с YouTube */}
          <p className="mt-2 text-zinc-500">
            Трейлеры с канала{" "}
            <a href="https://www.youtube.com/@kztigerfilms/videos" target="_blank" rel="noopener noreferrer" className="text-amber hover:underline">
              Tiger Films
            </a>
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredTrailers.map((trailer) => (
              <TrailerCard key={`${trailer.videoId}-${trailer.title}`} trailer={trailer} />
            ))}
          </div>
          <p className="mt-6 text-lg font-semibold text-white">Фильмы</p>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {newReleases.map((film) => (
              <FilmCard key={film.id} film={film} />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Link href="/films" className="btn-secondary">
              Все фильмы и трейлеры
            </Link>
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
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <Link href="/about" className="text-amber font-medium hover:underline">
                  О компании и команде →
                </Link>
                <span className="text-zinc-600">|</span>
                <Link href="/cooperation" className="text-amber font-medium hover:underline">
                  Сотрудничество →
                </Link>
              </div>
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
