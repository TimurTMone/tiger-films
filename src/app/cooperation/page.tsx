import Link from "next/link";

export default function CooperationPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white">Сотрудничество</h1>
      <p className="mt-2 text-zinc-400">
        Продюсерская компания Tiger Films открыта к сотрудничеству с режиссёрами, сценаристами и партнёрами.
      </p>

      <div className="mt-12 space-y-10">
        <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
          <h2 className="text-xl font-bold text-amber">Для режиссёров и сценаристов</h2>
          <p className="mt-3 text-zinc-400 leading-relaxed">
            Рассматриваем сценарии полнометражных фильмов в жанрах комедия, драма, семейное кино. 
            Предпочтение — проекты на казахском языке или с казахскими субтитрами для широкого проката в РК и СНГ.
          </p>
        </section>
        <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
          <h2 className="text-xl font-bold text-amber">Для актёров</h2>
          <p className="mt-3 text-zinc-400 leading-relaxed">
            Добавляйте анкету в <Link href="/actors" className="text-amber hover:underline">базу актёров</Link> — 
            мы используем её при кастингах и отборе на проекты.
          </p>
        </section>
        <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
          <h2 className="text-xl font-bold text-amber">Для партнёров и инвесторов</h2>
          <p className="mt-3 text-zinc-400 leading-relaxed">
            По вопросам совместного производства и инвестиций в кино проекты свяжитесь с нами через 
            <Link href="/contacts" className="text-amber hover:underline"> контакты</Link>.
          </p>
        </section>
      </div>

      <div className="mt-12 text-center">
        <Link href="/contacts" className="btn-primary">
          Связаться с нами
        </Link>
      </div>
    </div>
  );
}
