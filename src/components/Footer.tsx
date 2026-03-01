import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { href: "/", label: "Главная" },
  { href: "/films", label: "Наши фильмы" },
  { href: "/about", label: "О компании" },
  { href: "/team", label: "Команда" },
  { href: "/news", label: "Новости" },
  { href: "/cooperation", label: "Сотрудничество" },
  { href: "/contacts", label: "Контакты" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/tiger-films-logo.png"
                alt="Tiger Films"
                width={160}
                height={48}
                className="h-10 w-auto sm:h-11"
              />
            </Link>
            <p className="mt-3 max-w-xs text-sm text-zinc-400">
              Продюсерская компания, основанная в 2021 году на базе кинотеатров Kinopark-Kinoplexx Theatres для производства полнометражных фильмов.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Меню</h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-zinc-400 hover:text-amber transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Контакты</h3>
            <address className="mt-3 not-italic text-sm text-zinc-400">
              <p>Республика Казахстан, Алматы, 050040</p>
              <p>Аль-Фараби, 77/8, 4 этаж</p>
              <p className="mt-2">
                <a href="mailto:info@tigerfilms.kz" className="hover:text-amber transition-colors">info@tigerfilms.kz</a>
              </p>
              <p>
                <a href="tel:+77273311000" className="hover:text-amber transition-colors">+7 (727) 331-10-00</a>
                <span className="text-zinc-500"> (вн. 6109, 6102)</span>
              </p>
            </address>
          </div>
        </div>
        <div className="mt-10 border-t border-[var(--border)] pt-8 text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} Tiger Films. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
