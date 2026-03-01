export default function ContactsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white">Контакты</h1>
      <p className="mt-2 text-zinc-400">
        Свяжитесь с офисом Tiger Films по вопросам сотрудничества, прессы и проката.
      </p>

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
          <h2 className="text-lg font-semibold text-amber">Адрес</h2>
          <address className="mt-3 not-italic text-zinc-400">
            Республика Казахстан, Алматы, 050040<br />
            Аль-Фараби, 77/8, 4 этаж
          </address>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
          <h2 className="text-lg font-semibold text-amber">Email и телефон</h2>
          <p className="mt-3">
            <a href="mailto:info@tigerfilms.kz" className="text-amber hover:underline">info@tigerfilms.kz</a>
          </p>
          <p className="mt-2">
            <a href="tel:+77273311000" className="text-amber hover:underline">+7 (727) 331-10-00</a>
            <span className="text-zinc-500"> (вн. 6109, 6102)</span>
          </p>
        </div>
      </div>

      <div className="mt-12 rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="text-lg font-semibold text-amber">Партнёры</h2>
        <p className="mt-2 text-zinc-400">Our Media Group</p>
      </div>
    </div>
  );
}
