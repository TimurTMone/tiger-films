"use client";

import { useState } from "react";

export default function ActorsPage() {
  const [search, setSearch] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    birthDate: "",
    height: "",
    roles: "",
    experience: "",
    photoUrl: "",
    videoReel: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white">База актёров</h1>
      <p className="mt-2 text-zinc-400">
        Добавьте свои данные в базу Tiger Films для участия в кастингах и проектах.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        {/* Поиск по базе (заглушка) */}
        <section>
          <h2 className="text-xl font-bold text-white">Поиск по базе</h2>
          <p className="mt-1 text-sm text-zinc-500">Результаты кастингов и отбор по заявкам (функция в разработке).</p>
          <div className="mt-4">
            <input
              type="search"
              placeholder="Имя, роль, ключевые слова..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] py-3 px-4 text-white placeholder-zinc-500 focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber"
            />
            <p className="mt-2 text-sm text-zinc-500">
              Результаты поиска будут отображаться здесь после заполнения базы.
            </p>
          </div>
        </section>

        {/* Форма сбора данных актёра */}
        <section>
          <h2 className="text-xl font-bold text-white">Добавить анкету в базу</h2>
          <p className="mt-1 text-sm text-zinc-500">Заполните данные — мы свяжемся с вами при подходящих проектах.</p>

          {submitted ? (
            <div className="mt-6 rounded-xl border border-teal/30 bg-teal/10 p-6 text-center">
              <p className="font-medium text-teal">Анкета отправлена</p>
              <p className="mt-2 text-sm text-zinc-400">
                Спасибо! Мы сохранили ваши данные и свяжемся при появлении подходящих проектов.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-zinc-300">ФИО *</label>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-white focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-300">Email *</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-white focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-zinc-300">Телефон *</label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-white focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="birthDate" className="block text-sm font-medium text-zinc-300">Дата рождения</label>
                  <input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-white focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber"
                  />
                </div>
                <div>
                  <label htmlFor="height" className="block text-sm font-medium text-zinc-300">Рост (см)</label>
                  <input
                    id="height"
                    type="text"
                    placeholder="175"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-white placeholder-zinc-500 focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="roles" className="block text-sm font-medium text-zinc-300">Роли / амплуа</label>
                <input
                  id="roles"
                  type="text"
                  placeholder="Драма, комедия, эпизод..."
                  value={formData.roles}
                  onChange={(e) => setFormData({ ...formData, roles: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-white placeholder-zinc-500 focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber"
                />
              </div>
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-zinc-300">Опыт (театр, кино, курсы)</label>
                <textarea
                  id="experience"
                  rows={3}
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-white focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber"
                />
              </div>
              <div>
                <label htmlFor="photoUrl" className="block text-sm font-medium text-zinc-300">Ссылка на фото</label>
                <input
                  id="photoUrl"
                  type="url"
                  placeholder="https://..."
                  value={formData.photoUrl}
                  onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-white placeholder-zinc-500 focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber"
                />
              </div>
              <div>
                <label htmlFor="videoReel" className="block text-sm font-medium text-zinc-300">Ссылка на видео (демо / ролик)</label>
                <input
                  id="videoReel"
                  type="url"
                  placeholder="https://..."
                  value={formData.videoReel}
                  onChange={(e) => setFormData({ ...formData, videoReel: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-white placeholder-zinc-500 focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber"
                />
              </div>
              <button type="submit" className="btn-primary w-full sm:w-auto">
                Отправить анкету
              </button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
