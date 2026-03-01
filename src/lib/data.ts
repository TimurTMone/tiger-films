// Моковые данные для ребрендинга Tiger Films

export type Film = {
  id: string;
  titleRu: string;
  titleKz?: string;
  releaseDate: string;
  genre: string;
  duration?: string;
  ageRating: string;
  language: string;
  poster?: string;
  trailerUrl?: string;
  isNew?: boolean;
};

export type TeamMember = {
  id: string;
  name: string;
  role: "director" | "cinematographer" | "artist" | "producer";
  roleLabel: string;
  photo?: string;
  bio?: string;
  films: string[];
};

export type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image?: string;
  slug: string;
  commentsCount: number;
};

export type Comment = {
  id: string;
  newsId: string;
  author: string;
  text: string;
  date: string;
};

export type ActorForm = {
  fullName: string;
  email: string;
  phone: string;
  birthDate?: string;
  height?: string;
  roles: string[];
  experience?: string;
  photoUrl?: string;
  videoReel?: string;
};

export const films: Film[] = [
  {
    id: "1",
    titleRu: "Руың кім?",
    titleKz: "Руың кім?",
    releaseDate: "2025-12-11",
    genre: "Семейная комедия",
    duration: "01 ч. 25 м.",
    ageRating: "12+",
    language: "Казахский / Русские субтитры",
    isNew: true,
  },
  {
    id: "2",
    titleRu: "Назад в 90-ые. Я вернусь.",
    releaseDate: "2025-10-16",
    genre: "Фантастика, мелодрама, Комедия",
    ageRating: "14+",
    language: "Казахский / Русские субтитры",
    isNew: true,
  },
  {
    id: "3",
    titleRu: "Аменгер",
    releaseDate: "2025-09-18",
    genre: "Драма",
    ageRating: "",
    language: "Казахский / Русские субтитры",
    isNew: true,
  },
  {
    id: "4",
    titleRu: "Укради, если сможешь",
    releaseDate: "2025-08-21",
    genre: "Семейная комедия",
    duration: "01 ч. 34 м.",
    ageRating: "6+",
    language: "Казахский / Русские субтитры",
    isNew: true,
  },
  {
    id: "5",
    titleRu: "Сын Богача",
    releaseDate: "2025-07-17",
    genre: "Семейная комедия",
    duration: "01 ч. 20 м.",
    ageRating: "6+",
    language: "Казахский",
    isNew: true,
  },
  {
    id: "6",
    titleRu: "НВП ағай",
    releaseDate: "2024-05-02",
    genre: "Комедия",
    ageRating: "12+",
    language: "Казахский",
  },
  {
    id: "7",
    titleRu: "Мой джинн 2: Тайные желания",
    titleKz: "Жыным сол 2",
    releaseDate: "2024-01-18",
    genre: "Комедия, фэнтези",
    ageRating: "12+",
    language: "Казахский",
  },
  {
    id: "8",
    titleRu: "Коршілер",
    releaseDate: "2024-07-04",
    genre: "Драма",
    ageRating: "16+",
    language: "Казахский",
  },
  {
    id: "9",
    titleRu: "Женюсь на дочке богача",
    titleKz: "Байдың қызын аламын",
    releaseDate: "2023-09-21",
    genre: "Комедия",
    ageRating: "12+",
    language: "Казахский",
  },
  {
    id: "10",
    titleRu: "Бешбармак (Бесбармак)",
    releaseDate: "2023-10-26",
    genre: "Комедия",
    ageRating: "12+",
    language: "Казахский",
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: "t1",
    name: "Алексей Продюсеров",
    role: "director",
    roleLabel: "Режиссёр",
    films: ["Руың кім?", "Назад в 90-ые"],
    bio: "Режиссёр полнометражных комедий и драм.",
  },
  {
    id: "t2",
    name: "Мария Кадрова",
    role: "director",
    roleLabel: "Режиссёр",
    films: ["Аменгер", "Коршілер"],
    bio: "Драматург и режиссёр художественного кино.",
  },
  {
    id: "t3",
    name: "Дмитрий Светлов",
    role: "cinematographer",
    roleLabel: "Оператор-постановщик",
    films: ["Укради, если сможешь", "Сын Богача"],
    bio: "Оператор-постановщик, работа в формате IMAX.",
  },
  {
    id: "t4",
    name: "Айгуль Арт",
    role: "artist",
    roleLabel: "Художник-постановщик",
    films: ["Остров. Ұмытылмас саяхат", "Бишарашки в Таиланде"],
    bio: "Художник-постановщик, сценография и костюмы.",
  },
  {
    id: "t5",
    name: "Нурлан Оператор",
    role: "cinematographer",
    roleLabel: "Оператор",
    films: ["НВП ағай", "Мой джинн 2"],
    bio: "Оператор комедийных и семейных проектов.",
  },
];

export const newsItems: NewsItem[] = [
  {
    id: "n1",
    title: "Фильм «Кадет» представит Казахстан на «Оскаре»",
    excerpt: "Отечественная картина номинирована на премию Американской киноакадемии.",
    date: "2025-10-02",
    slug: "kadet-oscar",
    commentsCount: 12,
  },
  {
    id: "n2",
    title: "В Алматы прошла премьера «Қолыңнан келсе алып қаш»",
    excerpt: "Новый отечественный фильм показали в крупнейших кинотеатрах города.",
    date: "2025-08-23",
    slug: "premjera-almaty",
    commentsCount: 8,
  },
  {
    id: "n3",
    title: "Комедия «Остров. Ұмытылмас саяхат» вышла на большой экран",
    excerpt: "Съёмки проходили в Казахстане и Таиланде. Премьера в HALYK IMAX Kinopark 16.",
    date: "2025-05-29",
    slug: "ostrov-premiera",
    commentsCount: 24,
  },
  {
    id: "n4",
    title: "Студия Tiger Films профинансирует съёмки продолжения «Сказа о розовом зайце»",
    excerpt: "Продюсерская компания поддержала проект второй части популярной истории.",
    date: "2025-04-15",
    slug: "skaz-o-zayce",
    commentsCount: 5,
  },
  {
    id: "n5",
    title: "90-е, остров, тамада: какие фильмы представит Tiger Films в 2025 году?",
    excerpt: "Обзор анонсированных премьер и дат выхода в прокат.",
    date: "2025-03-01",
    slug: "tiger-films-2025",
    commentsCount: 18,
  },
];

export const commentsByNews: Record<string, Comment[]> = {
  "kadet-oscar": [
    { id: "c1", newsId: "kadet-oscar", author: "Зритель", text: "Гордимся! Удачи на «Оскаре».", date: "2025-10-03T10:00:00Z" },
    { id: "c2", newsId: "kadet-oscar", author: "Кинолюб", text: "Замечательная новость для всего казахстанского кино.", date: "2025-10-03T14:30:00Z" },
  ],
  "ostrov-premiera": [
    { id: "c3", newsId: "ostrov-premiera", author: "Алматинец", text: "Смотрели всей семьёй — очень смешно и красиво.", date: "2025-05-30T09:00:00Z" },
  ],
};

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return newsItems.find((n) => n.slug === slug);
}

export function getCommentsForNews(newsSlug: string): Comment[] {
  return commentsByNews[newsSlug] ?? [];
}

export function searchFilms(query: string): Film[] {
  const q = query.toLowerCase().trim();
  if (!q) return films;
  return films.filter(
    (f) =>
      f.titleRu.toLowerCase().includes(q) ||
      (f.titleKz?.toLowerCase().includes(q)) ||
      f.genre.toLowerCase().includes(q)
  );
}

export function getTeamByRole(role: TeamMember["role"]): TeamMember[] {
  return teamMembers.filter((m) => m.role === role);
}
