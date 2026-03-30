"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import ActorCard from "@/components/ActorCard";
import { Actor, getActorAge } from "@/lib/data";
import { fetchActors, fetchCities, fetchAppearanceTypes, apiActorToActor } from "@/lib/api";

function ActorProfileModal({
  actor,
  onClose,
}: {
  actor: Actor;
  onClose: () => void;
}) {
  const age = getActorAge(actor.birthDate);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="actor-profile-name"
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--border)] bg-[var(--card)] px-6 py-4">
          <h2 id="actor-profile-name" className="text-xl font-bold text-white">
            {actor.name}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-400 transition hover:bg-[var(--card-hover)] hover:text-white focus:outline-none focus:ring-2 focus:ring-amber"
            aria-label="Закрыть"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-6 p-6">
          <ProfileBlock title="Основное">
            <ul className="space-y-1.5 text-sm text-zinc-300">
              {actor.city && (
                <li>
                  <span className="text-zinc-500">Город:</span> {actor.city}, {actor.country}
                </li>
              )}
              {age != null && (
                <li>
                  <span className="text-zinc-500">Возраст:</span> {age} лет
                </li>
              )}
              {actor.currentStatus && (
                <li>
                  <span className="text-zinc-500">Статус:</span> {actor.currentStatus}
                </li>
              )}
              {actor.heightCm && (
                <li>
                  <span className="text-zinc-500">Рост / вес:</span> {actor.heightCm} см
                  {actor.weightKg ? ` / ${actor.weightKg} кг` : ""}
                </li>
              )}
              {actor.eyeColor && (
                <li>
                  <span className="text-zinc-500">Глаза / волосы:</span> {actor.eyeColor}
                  {actor.hairColor ? ` / ${actor.hairColor}` : ""}
                </li>
              )}
              {actor.appearanceType && (
                <li>
                  <span className="text-zinc-500">Тип внешности:</span> {actor.appearanceType}
                </li>
              )}
            </ul>
          </ProfileBlock>
          {actor.languages && (
            <ProfileBlock title="Языки">
              <p className="text-sm text-zinc-300">{actor.languages}</p>
            </ProfileBlock>
          )}
          {(actor.education || actor.additionalEducation) && (
            <ProfileBlock title="Образование">
              <p className="text-sm text-zinc-300">
                {[actor.education, actor.additionalEducation].filter(Boolean).join(". ")}
              </p>
            </ProfileBlock>
          )}
          {(actor.portfolio || actor.theater || actor.tvRadio) && (
            <ProfileBlock title="Опыт">
              <ul className="space-y-2 text-sm text-zinc-300">
                {actor.portfolio && <li>{actor.portfolio}</li>}
                {actor.theater && <li><span className="text-zinc-500">Театр:</span> {actor.theater}</li>}
                {actor.tvRadio && <li><span className="text-zinc-500">ТВ/радио:</span> {actor.tvRadio}</li>}
              </ul>
            </ProfileBlock>
          )}
          {(actor.sports || actor.choreography || actor.musicalInstruments || actor.otherSkills) && (
            <ProfileBlock title="Навыки">
              <ul className="space-y-1 text-sm text-zinc-300">
                {actor.choreography && <li>Хореография: {actor.choreography}</li>}
                {actor.musicalInstruments && <li>Инструменты: {actor.musicalInstruments}</li>}
                {actor.sports && <li>Спорт: {actor.sports}</li>}
                {actor.otherSkills && <li>Другое: {actor.otherSkills}</li>}
              </ul>
            </ProfileBlock>
          )}
          <ProfileBlock title="Контакты">
            <ul className="space-y-1 text-sm text-zinc-300">
              {actor.phone && <li>Тел.: {actor.phone}</li>}
              {actor.email && <li>Email: {actor.email}</li>}
              {actor.socialLinks && <li>Соцсети: {actor.socialLinks}</li>}
              {actor.videoShowreel && (
                <li>
                  <a
                    href={actor.videoShowreel}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber hover:underline"
                  >
                    Видео / шоурил
                  </a>
                </li>
              )}
            </ul>
          </ProfileBlock>
        </div>
      </div>
    </div>
  );
}

function ProfileBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-amber">
        {title}
      </h3>
      {children}
    </div>
  );
}

export default function ActorsPage() {
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [appearance, setAppearance] = useState("");
  const [selectedActor, setSelectedActor] = useState<Actor | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formSection, setFormSection] = useState<"personal" | "appearance" | "skills" | "contact">("personal");

  const [actorsList, setActorsList] = useState<Actor[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState<string[]>([]);
  const [appearances, setAppearances] = useState<string[]>([]);
  const perPage = 24;

  // Load cities & appearance types once
  useEffect(() => {
    fetchCities().then((data) => setCities(data.map((d) => d.city).filter(Boolean))).catch(() => {});
    fetchAppearanceTypes().then((data) => setAppearances(data.map((d) => d.type).filter(Boolean))).catch(() => {});
  }, []);

  // Fetch actors on filter/page change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      fetchActors({
        page,
        per_page: perPage,
        search: search || undefined,
        gender: gender || undefined,
        city: city || undefined,
        appearance_type: appearance || undefined,
      })
        .then((res) => {
          setActorsList(res.actors.map(apiActorToActor) as Actor[]);
          setTotal(res.total);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }, 300); // debounce
    return () => clearTimeout(timer);
  }, [page, search, gender, city, appearance]);

  const filtered = actorsList;
  const totalPages = Math.ceil(total / perPage);

  const scrollToForm = useCallback(() => {
    document.getElementById("actor-form")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          База актёров
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-zinc-400">
          Поиск актёров для кастингов и проектов Tiger Films. Оставьте анкету — мы свяжемся при подходящих ролях.
        </p>
      </section>

      {/* Search & filters */}
      <section className="mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-3">
          <div className="flex-1">
            <label htmlFor="actor-search" className="sr-only">
              Поиск по имени, городу, языкам
            </label>
            <input
              id="actor-search"
              type="search"
              placeholder="Имя, город, языки, тип внешности..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] py-3 px-4 text-white placeholder-zinc-500 focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select
              aria-label="Пол"
              value={gender}
              onChange={(e) => { setGender(e.target.value); setPage(1); }}
              className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2.5 text-sm text-white focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber"
            >
              <option value="">Пол</option>
              <option value="male">М</option>
              <option value="female">Ж</option>
            </select>
            <select
              aria-label="Город"
              value={city}
              onChange={(e) => { setCity(e.target.value); setPage(1); }}
              className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2.5 text-sm text-white focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber"
            >
              <option value="">Город</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              aria-label="Тип внешности"
              value={appearance}
              onChange={(e) => { setAppearance(e.target.value); setPage(1); }}
              className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2.5 text-sm text-white focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber"
            >
              <option value="">Внешность</option>
              {appearances.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="mt-2 text-sm text-zinc-500">
          {loading ? "Загрузка..." : `Найдено: ${total} актёров`}
        </p>
      </section>

      {/* Grid: 3 per row */}
      <section className="mb-16">
        {loading ? (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] py-16 text-center">
            <p className="text-zinc-400">Загрузка актёров...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] py-16 text-center">
            <p className="text-zinc-500">По вашему запросу никого не найдено.</p>
            <p className="mt-2 text-sm text-zinc-600">
              Попробуйте изменить фильтры или{" "}
              <button type="button" onClick={scrollToForm} className="text-amber hover:underline">
                добавьте свою анкету
              </button>
              .
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((actor) => (
                <ActorCard
                  key={actor.id}
                  actor={actor}
                  onSelect={setSelectedActor}
                />
              ))}
            </div>
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                  className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm text-zinc-300 transition hover:bg-[var(--card-hover)] disabled:opacity-30"
                >
                  Назад
                </button>
                <span className="text-sm text-zinc-500">
                  Стр. {page} из {totalPages}
                </span>
                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => setPage(page + 1)}
                  className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm text-zinc-300 transition hover:bg-[var(--card-hover)] disabled:opacity-30"
                >
                  Вперёд
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* CTA + Form */}
      <section id="actor-form" className="scroll-mt-8">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-white">
            Добавить анкету в базу
          </h2>
          <p className="mt-2 text-zinc-400">
            Заполните данные по форме кастинга — мы свяжемся при подходящих проектах. Анкета соответствует{" "}
            <a
              href="https://docs.google.com/spreadsheets/d/1-u6FMiRpLS9pFDxKtJLtkXL4RInv-PWD6Pt9wR-ohd8/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber hover:underline"
            >
              БАЗА эпизоды (Google)
            </a>
            .
          </p>

          {submitted ? (
            <div className="mt-8 rounded-xl border border-teal/30 bg-teal/10 p-8 text-center">
              <p className="font-semibold text-teal">Анкета отправлена</p>
              <p className="mt-2 text-sm text-zinc-400">
                Спасибо! Мы сохранили ваши данные и свяжемся при появлении подходящих проектов.
              </p>
            </div>
          ) : (
            <ActorSubmissionForm
              formSection={formSection}
              setFormSection={setFormSection}
              onSubmitted={() => setSubmitted(true)}
            />
          )}
        </div>
      </section>

      {selectedActor && (
        <ActorProfileModal
          actor={selectedActor}
          onClose={() => setSelectedActor(null)}
        />
      )}
    </div>
  );
}

/** Form sections matching questionnaire (БАЗА эпизоды) */
const formLabels = {
  personal: "Личные данные",
  appearance: "Внешность и здоровье",
  skills: "Образование и навыки",
  contact: "Контакты и портфолио",
};

type FormState = {
  fullName: string;
  gender: string;
  birthDate: string;
  country: string;
  city: string;
  previousTigerFilms: string;
  education: string;
  additionalEducation: string;
  currentStatus: string;
  heightCm: string;
  weightKg: string;
  clothingSize: string;
  shoeSize: string;
  eyeColor: string;
  hairColor: string;
  appearanceType: string;
  appearanceNotes: string;
  chronicConditions: string;
  allergies: string;
  passportVisa: string;
  languages: string;
  vocalTimbre: string;
  choreography: string;
  musicalInstruments: string;
  sports: string;
  otherSkills: string;
  drivingLicense: string;
  portfolio: string;
  theater: string;
  tvRadio: string;
  agent: string;
  phone: string;
  phoneReserve: string;
  email: string;
  socialLinks: string;
  videoShowreel: string;
  filmProfiles: string;
  photoProfile: string;
  photoFullFace: string;
  photoFullBody: string;
  stuntDouble: string;
  pacemaker: string;
  fracturesOrHeadInjury: string;
  canSwim: string;
  religiousRituals: string;
};

const initialForm: FormState = {
  fullName: "",
  gender: "",
  birthDate: "",
  country: "Казахстан",
  city: "",
  previousTigerFilms: "",
  education: "",
  additionalEducation: "",
  currentStatus: "",
  heightCm: "",
  weightKg: "",
  clothingSize: "",
  shoeSize: "",
  eyeColor: "",
  hairColor: "",
  appearanceType: "",
  appearanceNotes: "",
  chronicConditions: "",
  allergies: "",
  passportVisa: "",
  languages: "",
  vocalTimbre: "",
  choreography: "",
  musicalInstruments: "",
  sports: "",
  otherSkills: "",
  drivingLicense: "",
  portfolio: "",
  theater: "",
  tvRadio: "",
  agent: "",
  phone: "",
  phoneReserve: "",
  email: "",
  socialLinks: "",
  videoShowreel: "",
  filmProfiles: "",
  photoProfile: "",
  photoFullFace: "",
  photoFullBody: "",
  stuntDouble: "",
  pacemaker: "",
  fracturesOrHeadInjury: "",
  canSwim: "",
  religiousRituals: "",
};

function ActorSubmissionForm({
  formSection,
  setFormSection,
  onSubmitted,
}: {
  formSection: "personal" | "appearance" | "skills" | "contact";
  setFormSection: (s: "personal" | "appearance" | "skills" | "contact") => void;
  onSubmitted: () => void;
}) {
  const [form, setForm] = useState<FormState>(initialForm);

  const update = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://tiger-films-api.onrender.com";
    try {
      await fetch(`${API_URL}/api/actors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.fullName,
          gender: form.gender || "male",
          birth_date: form.birthDate || null,
          country: form.country || "Казахстан",
          city: form.city || null,
          previous_tiger_films: form.previousTigerFilms || null,
          education: form.education || null,
          additional_education: form.additionalEducation || null,
          current_status: form.currentStatus || null,
          height_cm: form.heightCm ? parseInt(form.heightCm) : null,
          weight_kg: form.weightKg ? parseInt(form.weightKg) : null,
          clothing_size: form.clothingSize || null,
          shoe_size: form.shoeSize || null,
          eye_color: form.eyeColor || null,
          hair_color: form.hairColor || null,
          appearance_type: form.appearanceType || null,
          appearance_notes: form.appearanceNotes || null,
          chronic_conditions: form.chronicConditions || null,
          allergies: form.allergies || null,
          passport_visa: form.passportVisa || null,
          languages: form.languages || null,
          vocal_timbre: form.vocalTimbre || null,
          choreography: form.choreography || null,
          musical_instruments: form.musicalInstruments || null,
          sports: form.sports || null,
          other_skills: form.otherSkills || null,
          driving_license: form.drivingLicense || null,
          portfolio: form.portfolio || null,
          theater: form.theater || null,
          tv_radio: form.tvRadio || null,
          agent: form.agent || null,
          phone: form.phone || null,
          phone_reserve: form.phoneReserve || null,
          email: form.email || null,
          social_links: form.socialLinks || null,
          video_showreel: form.videoShowreel || null,
          film_profiles: form.filmProfiles || null,
          photo_profile: form.photoProfile || null,
          photo_full_face: form.photoFullFace || null,
          photo_full_body: form.photoFullBody || null,
          stunt_double: form.stuntDouble || null,
          pacemaker: form.pacemaker === "yes",
          fractures_or_head_injury: form.fracturesOrHeadInjury || null,
          can_swim: form.canSwim === "yes",
          religious_rituals: form.religiousRituals || null,
        }),
      });
    } catch {}
    onSubmitted();
  };

  const sections: ("personal" | "appearance" | "skills" | "contact")[] = [
    "personal",
    "appearance",
    "skills",
    "contact",
  ];

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      {/* Section tabs */}
      <div className="mb-6 flex flex-wrap gap-2 border-b border-[var(--border)] pb-4">
        {sections.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFormSection(s)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              formSection === s
                ? "bg-amber text-black"
                : "bg-[var(--card-hover)] text-zinc-400 hover:text-white"
            }`}
          >
            {formLabels[s]}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {formSection === "personal" && (
          <>
            <Field label="ФИО *" required>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                className="input"
                required
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Пол">
                <select
                  value={form.gender}
                  onChange={(e) => update("gender", e.target.value)}
                  className="input"
                >
                  <option value="">—</option>
                  <option value="male">Мужской</option>
                  <option value="female">Женский</option>
                </select>
              </Field>
              <Field label="Дата рождения (день, месяц, год)">
                <input
                  type="date"
                  value={form.birthDate}
                  onChange={(e) => update("birthDate", e.target.value)}
                  className="input"
                />
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Страна проживания">
                <input
                  type="text"
                  value={form.country}
                  onChange={(e) => update("country", e.target.value)}
                  className="input"
                />
              </Field>
              <Field label="Город проживания">
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  className="input"
                />
              </Field>
            </div>
            <Field label="Сотрудничали ли с Kinopark и Tiger Films? Если да — название проекта">
              <input
                type="text"
                value={form.previousTigerFilms}
                onChange={(e) => update("previousTigerFilms", e.target.value)}
                className="input"
                placeholder="Нет / Название проекта"
              />
            </Field>
            <Field label="Образование (учреждение, факультет, специальность, годы)">
              <textarea
                value={form.education}
                onChange={(e) => update("education", e.target.value)}
                className="input min-h-[80px]"
                rows={2}
              />
            </Field>
            <Field label="Дополнительное образование (курсы, повышение квалификации)">
              <input
                type="text"
                value={form.additionalEducation}
                onChange={(e) => update("additionalEducation", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="В данный момент я">
              <select
                value={form.currentStatus}
                onChange={(e) => update("currentStatus", e.target.value)}
                className="input"
              >
                <option value="">—</option>
                <option value="работаю">Работаю</option>
                <option value="учусь">Учусь</option>
                <option value="полностью свободен">Полностью свободен</option>
              </select>
            </Field>
          </>
        )}

        {formSection === "appearance" && (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Рост (см)">
                <input
                  type="number"
                  value={form.heightCm}
                  onChange={(e) => update("heightCm", e.target.value)}
                  className="input"
                  placeholder="175"
                />
              </Field>
              <Field label="Вес (кг)">
                <input
                  type="number"
                  value={form.weightKg}
                  onChange={(e) => update("weightKg", e.target.value)}
                  className="input"
                  placeholder="70"
                />
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Размер одежды (российский)">
                <input
                  type="text"
                  value={form.clothingSize}
                  onChange={(e) => update("clothingSize", e.target.value)}
                  className="input"
                  placeholder="48-50"
                />
              </Field>
              <Field label="Размер обуви">
                <input
                  type="text"
                  value={form.shoeSize}
                  onChange={(e) => update("shoeSize", e.target.value)}
                  className="input"
                />
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Цвет глаз">
                <input
                  type="text"
                  value={form.eyeColor}
                  onChange={(e) => update("eyeColor", e.target.value)}
                  className="input"
                  placeholder="карий, голубой..."
                />
              </Field>
              <Field label="Цвет волос">
                <input
                  type="text"
                  value={form.hairColor}
                  onChange={(e) => update("hairColor", e.target.value)}
                  className="input"
                  placeholder="брюнет, шатен..."
                />
              </Field>
            </div>
            <Field label="Тип внешности">
              <select
                value={form.appearanceType}
                onChange={(e) => update("appearanceType", e.target.value)}
                className="input"
              >
                <option value="">—</option>
                <option value="европейский">Европейский</option>
                <option value="азиатский">Азиатский</option>
                <option value="славянский">Славянский</option>
                <option value="кавказский">Кавказский</option>
              </select>
            </Field>
            <Field label="Особенности внешности">
              <input
                type="text"
                value={form.appearanceNotes}
                onChange={(e) => update("appearanceNotes", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Хронические заболевания">
              <input
                type="text"
                value={form.chronicConditions}
                onChange={(e) => update("chronicConditions", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Аллергия">
              <input
                type="text"
                value={form.allergies}
                onChange={(e) => update("allergies", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Загранпаспорт, визы (срок действия)">
              <input
                type="text"
                value={form.passportVisa}
                onChange={(e) => update("passportVisa", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Кардиостимулятор?">
              <select
                value={form.pacemaker}
                onChange={(e) => update("pacemaker", e.target.value)}
                className="input"
              >
                <option value="">—</option>
                <option value="no">Нет</option>
                <option value="yes">Да</option>
              </select>
            </Field>
            <Field label="Переломы или ЧМТ?">
              <input
                type="text"
                value={form.fracturesOrHeadInjury}
                onChange={(e) => update("fracturesOrHeadInjury", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Умеете плавать?">
              <select
                value={form.canSwim}
                onChange={(e) => update("canSwim", e.target.value)}
                className="input"
              >
                <option value="">—</option>
                <option value="yes">Да</option>
                <option value="no">Нет</option>
              </select>
            </Field>
            <Field label="Религиозные обряды (если да — какие)">
              <input
                type="text"
                value={form.religiousRituals}
                onChange={(e) => update("religiousRituals", e.target.value)}
                className="input"
              />
            </Field>
          </>
        )}

        {formSection === "skills" && (
          <>
            <Field label="Владение языками">
              <input
                type="text"
                value={form.languages}
                onChange={(e) => update("languages", e.target.value)}
                className="input"
                placeholder="казахский, русский, английский..."
              />
            </Field>
            <Field label="Вокал и тембр голоса">
              <input
                type="text"
                value={form.vocalTimbre}
                onChange={(e) => update("vocalTimbre", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Хореография">
              <input
                type="text"
                value={form.choreography}
                onChange={(e) => update("choreography", e.target.value)}
                className="input"
                placeholder="бальные, народные, хип-хоп..."
              />
            </Field>
            <Field label="Музыкальные инструменты">
              <input
                type="text"
                value={form.musicalInstruments}
                onChange={(e) => update("musicalInstruments", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Спорт">
              <input
                type="text"
                value={form.sports}
                onChange={(e) => update("sports", e.target.value)}
                className="input"
                placeholder="плавание, конный спорт..."
              />
            </Field>
            <Field label="Другие навыки">
              <input
                type="text"
                value={form.otherSkills}
                onChange={(e) => update("otherSkills", e.target.value)}
                className="input"
                placeholder="озвучивание, пародия..."
              />
            </Field>
            <Field label="Вождение (права, категория)">
              <input
                type="text"
                value={form.drivingLicense}
                onChange={(e) => update("drivingLicense", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Портфолио (проект, год, режиссёр, студия, роль)">
              <textarea
                value={form.portfolio}
                onChange={(e) => update("portfolio", e.target.value)}
                className="input min-h-[100px]"
                rows={4}
              />
            </Field>
            <Field label="Театральные работы">
              <textarea
                value={form.theater}
                onChange={(e) => update("theater", e.target.value)}
                className="input min-h-[60px]"
                rows={2}
              />
            </Field>
            <Field label="ТВ, радио (передачи, годы)">
              <input
                type="text"
                value={form.tvRadio}
                onChange={(e) => update("tvRadio", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Агентство и агенты (контакты, ссылка)">
              <input
                type="text"
                value={form.agent}
                onChange={(e) => update("agent", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Дублер (если есть)">
              <input
                type="text"
                value={form.stuntDouble}
                onChange={(e) => update("stuntDouble", e.target.value)}
                className="input"
              />
            </Field>
          </>
        )}

        {formSection === "contact" && (
          <>
            <Field label="Телефон (личный) *" required>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="input"
                required
              />
            </Field>
            <Field label="Резервный номер телефона">
              <input
                type="tel"
                value={form.phoneReserve}
                onChange={(e) => update("phoneReserve", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Email (личный) *" required>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="input"
                required
              />
            </Field>
            <Field label="Соцсети (ссылки)">
              <input
                type="text"
                value={form.socialLinks}
                onChange={(e) => update("socialLinks", e.target.value)}
                className="input"
                placeholder="Instagram, Facebook..."
              />
            </Field>
            <Field label="Ссылка на видео-визитку или шоурил">
              <input
                type="url"
                value={form.videoShowreel}
                onChange={(e) => update("videoShowreel", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Профили на кино-сайтах">
              <input
                type="text"
                value={form.filmProfiles}
                onChange={(e) => update("filmProfiles", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Ссылка на фото в профиль">
              <input
                type="url"
                value={form.photoProfile}
                onChange={(e) => update("photoProfile", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Ссылка на фото в анфас">
              <input
                type="url"
                value={form.photoFullFace}
                onChange={(e) => update("photoFullFace", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Ссылка на фото в полный рост">
              <input
                type="url"
                value={form.photoFullBody}
                onChange={(e) => update("photoFullBody", e.target.value)}
                className="input"
              />
            </Field>
          </>
        )}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <button type="submit" className="btn-primary">
          Отправить анкету
        </button>
        {formSection !== "contact" && (
          <button
            type="button"
            onClick={() => {
              const i = sections.indexOf(formSection);
              if (i < sections.length - 1) setFormSection(sections[i + 1]);
            }}
            className="btn-secondary"
          >
            Далее: {formLabels[sections[sections.indexOf(formSection) + 1]]}
          </button>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-300">
        {label} {required && <span className="text-amber">*</span>}
      </label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
