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
  /** YouTube video ID from embed/trailer on tigerfilms.kz */
  youtubeVideoId?: string;
  isNew?: boolean;
  /** Краткое содержание from tigerfilms.kz */
  description?: string;
};

/** Trailer from YouTube channel @kztigerfilms - add videoId from each video's URL (watch?v=VIDEO_ID) */
export type Trailer = {
  videoId: string;
  title: string;
  filmId?: string;
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

/** Leadership team from tigerfilms.kz/about-us/ */
export type LeadershipMember = {
  id: string;
  nameRu: string;
  nameKz?: string;
  nameEn?: string;
  roleRu: string;
  roleKz?: string;
  roleEn?: string;
  photo?: string;
};

export type Lang = "ru" | "kz" | "en";

export type NewsItem = {
  id: string;
  /** Russian (default) */
  title: string;
  excerpt: string;
  /** Kazakh */
  titleKz?: string;
  excerptKz?: string;
  /** English */
  titleEn?: string;
  excerptEn?: string;
  /** Full press release body */
  bodyRu?: string;
  bodyKz?: string;
  bodyEn?: string;
  date: string;
  image?: string;
  slug: string;
  commentsCount: number;
  sourceUrl?: string;
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

/** Actor profile — fields align with БАЗА эпизоды questionnaire (Google Sheet) */
export type Actor = {
  id: string;
  /** Full name / ФИО */
  name: string;
  /** male | female */
  gender: "male" | "female";
  /** YYYY-MM-DD for age calculation */
  birthDate?: string;
  country: string;
  city: string;
  /** Previous work with Kinopark / Tiger Films */
  previousTigerFilms?: string;
  education?: string;
  additionalEducation?: string;
  /** e.g. "работаю" | "учусь" | "полностью свободен" */
  currentStatus?: string;
  heightCm?: number;
  weightKg?: number;
  clothingSize?: string;
  shoeSize?: string;
  eyeColor?: string;
  hairColor?: string;
  appearanceType?: string;
  appearanceNotes?: string;
  chronicConditions?: string;
  allergies?: string;
  passportVisa?: string;
  languages?: string;
  vocalTimbre?: string;
  choreography?: string;
  musicalInstruments?: string;
  sports?: string;
  otherSkills?: string;
  drivingLicense?: string;
  portfolio?: string;
  theater?: string;
  tvRadio?: string;
  agent?: string;
  phone?: string;
  phoneReserve?: string;
  email?: string;
  socialLinks?: string;
  videoShowreel?: string;
  filmProfiles?: string;
  /** Profile photo URL (face) */
  photoProfile?: string;
  /** Full face photo URL */
  photoFullFace?: string;
  /** Full body photo URL */
  photoFullBody?: string;
  stuntDouble?: string;
  pacemaker?: boolean;
  fracturesOrHeadInjury?: string;
  canSwim?: boolean;
  religiousRituals?: string;
};

/** Sample actors from casting base (БАЗА эпизоды) — for display and search demo */
export const actors: Actor[] = [
  {
    id: "a1",
    name: "Отежан Мейирбек Сагындыкулы",
    gender: "male",
    birthDate: "1996-12-26",
    country: "Казахстан",
    city: "Алматы",
    previousTigerFilms: 'Фильм "Боксер" (работа в команде руководства актерами массовых сцен)',
    education: "Режиссер массовых представлений и шоу программ и актерское мастерство",
    currentStatus: "полностью свободен",
    heightCm: 180,
    weightKg: 60,
    clothingSize: "48-50",
    shoeSize: "42",
    eyeColor: "карий",
    hairColor: "брюнет",
    appearanceType: "азиатский",
    languages: "казахский, русский",
    portfolio: "Қаш (2022, А.Сейтов), Каникулы оффлайн (2019), Скорая помощь, Горный лук (2022) и др.",
    phone: "+77012641084",
    email: "meir.otezhan@mail.ru",
    socialLinks: "https://www.facebook.com/meir.otezhan",
  },
  {
    id: "a2",
    name: "Белла Байқожа",
    gender: "female",
    birthDate: "1996-10-17",
    country: "Казахстан",
    city: "Алматы",
    education: "КАЗНУ (Педагогика; психология). Курс актерского мастерства",
    currentStatus: "полностью свободен",
    heightCm: 160,
    weightKg: 53,
    clothingSize: "44-46",
    shoeSize: "37",
    eyeColor: "карий",
    hairColor: "брюнет",
    appearanceType: "азиатский",
    languages: "казахский, русский, английский",
    sports: "плавание, йога, гандбол, капоэйра",
    drivingLicense: "категория В (механика)",
    portfolio: "2022 Промо-ролик Esport, Реклама Wildberries, Фильм Понча (эпизод), Суд идет, Полигон и др.",
    phone: "+77055754417",
    email: "470178@mail.ru",
    socialLinks: "@bella1tabys",
  },
  {
    id: "a3",
    name: "Исаева Асель Амреевна",
    gender: "female",
    birthDate: "1996-10-09",
    country: "Казахстан",
    city: "Алматы",
    education: "Кнк им. Курмангазы; инструментальное исполнительство. Курсы по актерскому мастерству и сценической речи",
    currentStatus: "работаю",
    heightCm: 164,
    weightKg: 49,
    clothingSize: "40-42",
    shoeSize: "38-39",
    eyeColor: "карий",
    hairColor: "брюнет",
    appearanceType: "азиатский",
    appearanceNotes: "Холодный взгляд",
    languages: "казахский, русский, английский",
    sports: "Йога, фитнес",
    drivingLicense: "категория B (автомат)",
    portfolio: "Сериал Qarga (2023), Закира (2022), Жан жарым (2023), Пространство трансформа и др.",
    theater: "Пространство трансформа 2021, «Каин» Дж.Байрона, роль Люцифера",
    phone: "87075516505",
    email: "issayeva_assel@mail.ru",
    socialLinks: "@Issayeva__assel",
  },
  {
    id: "a4",
    name: "Арқалық Сағдолла",
    gender: "male",
    birthDate: "1996-12-08",
    country: "Казахстан",
    city: "Алматы",
    education: "Қазақтың спорт және туризм академиясы, Таэквондо",
    currentStatus: "работаю",
    heightCm: 184,
    weightKg: 96,
    clothingSize: "54-56",
    shoeSize: "43",
    eyeColor: "карий",
    hairColor: "шатен",
    appearanceType: "азиатский",
    languages: "казахский, русский",
    sports: "конный спорт, боевые искусства, футбол, волейбол, баскетбол",
    drivingLicense: "категория B (автомат), категория С",
    portfolio: "Қажымұқан, Буркіт, Жамбыл жаңа дәуір, Қорқыт, Ұлы дала таңы и др.",
    phone: "87474280797",
    email: "Arkalyksagdolla@gmail.com",
    socialLinks: "Arkalyk_sagdolla Instagram",
  },
  {
    id: "a5",
    name: "Андреев Пётр",
    gender: "male",
    birthDate: "1982-11-13",
    country: "Казахстан",
    city: "Алматы",
    previousTigerFilms: "Научи меня жить. Маша и *",
    education: "Актёрский. Актёр театра и кино",
    currentStatus: "полностью свободен",
    heightCm: 184,
    weightKg: 90,
    clothingSize: "52-54",
    shoeSize: "45",
    eyeColor: "серо-синие",
    hairColor: "блондин",
    appearanceType: "европейский",
    allergies: "сезонная аллергия",
    passportVisa: "Есть до 2030 года",
    languages: "русский, английский, французский, польский, украинский",
    choreography: "бальные",
    musicalInstruments: "ударные",
    sports: "плавание, конный спорт, боевые искусства, футбол, волейбол, теннис, бег, велоспорт, альпинизм",
    otherSkills: "озвучивание, пародия, жонглирование, сочинение стихов/песен",
    drivingLicense: "категория B (автомат)",
    portfolio: "Операция Набат. Эксперт самолётов. Антрепризы. Реклама. ТВ. Передачи",
    phone: "+77771762484",
    email: "13stakanoff@mail.ru",
    socialLinks: "@13stakanof",
    videoShowreel: "https://youtu.be/XfaV9hhX548",
    canSwim: true,
  },
  {
    id: "a6",
    name: "Тажибай Ажаркул",
    gender: "female",
    birthDate: "1996-09-20",
    country: "Казахстан",
    city: "Алматы",
    previousTigerFilms: "Бишарашки",
    education: "Академия искусств имени Жургенова",
    currentStatus: "полностью свободен",
    heightCm: 164,
    weightKg: 66,
    clothingSize: "48-50",
    shoeSize: "38",
    eyeColor: "карий",
    hairColor: "брюнет",
    appearanceType: "азиатский",
    passportVisa: "Есть загранпаспорт (до 23.11.2030)",
    languages: "казахский, русский",
    vocalTimbre: "альт, академический",
    choreography: "народные",
    musicalInstruments: "домбыра",
    sports: "гимнастика",
    otherSkills: "озвучивание, пародия",
    drivingLicense: "категория B (автомат)",
    portfolio: "Бишарашки, Самалмен сырласу, Замандастар, Казахи против инопланетян, Сержан братан, Касымхан и др.",
    phone: "870176727472",
    email: "g.rahim_@mail.ru",
    socialLinks: "@azharkul_tazhibai",
    canSwim: true,
  },
  {
    id: "a7",
    name: "Қанатұлы Абдул Азиз",
    gender: "male",
    birthDate: "2013-06-04",
    country: "Казахстан",
    city: "Алматы",
    education: "РМСШИ им. К.Ж. Байсеитовой, домбыра. Курсы актерского мастерства, танцы, вокал",
    currentStatus: "учусь",
    heightCm: 140,
    weightKg: 30,
    clothingSize: "38-40",
    shoeSize: "35",
    eyeColor: "карий",
    hairColor: "шатен",
    appearanceType: "азиатский",
    appearanceNotes: "красивая внешность, для своего возраста высокий",
    languages: "казахский, русский, английский начинающий",
    vocalTimbre: "академический вокал",
    choreography: "хип-хоп",
    musicalInstruments: "фортепиано, домбыра",
    sports: "дзюдо",
    otherSkills: "быстро учиться играть на любом инструменте, совершенный слух",
    phone: "87012272739",
    email: "kanat1985@gmail.com",
    socialLinks: "instagram.com/kanatulyabdulaziz",
    videoShowreel: "https://www.youtube.com/watch?v=nT53psAFKQA",
  },
  {
    id: "a8",
    name: "Мукашева Адина",
    gender: "female",
    birthDate: "2014-10-04",
    country: "Казахстан",
    city: "Алматы",
    heightCm: 140,
    weightKg: 34,
    eyeColor: "карие",
    hairColor: "тёмно-коричневый",
    appearanceType: "азиатский",
    languages: "казахский, русский",
    choreography: "народные танцы",
    musicalInstruments: "домбра",
    otherSkills: "чтение стихов",
    portfolio: "ЖАБАЙЫ (гл. роль), Қашан үйленесің?, Оттегі, Qumalaq, Шырағың сөнбесін, реклама Abdi, Агуша, Hyundai и др.",
    phone: "87471531707",
    socialLinks: "@adina_mukasheva_",
  },
  {
    id: "a9",
    name: "Алдамжаров Азиз",
    gender: "male",
    birthDate: "2010-05-11",
    country: "Казахстан",
    city: "Алматы",
    education: "Среднее незаконченное",
    currentStatus: "учусь",
    heightCm: 155,
    weightKg: 45,
    clothingSize: "38-40",
    shoeSize: "38",
    eyeColor: "карий",
    hairColor: "брюнет",
    appearanceType: "азиатский",
    allergies: "на пыль",
    passportVisa: "08 ноября 2031 года",
    languages: "казахский, русский, английский",
    musicalInstruments: "гитара",
    sports: "теннис, баскетбол",
    otherSkills: "озвучивание, пародия",
    portfolio: "Билет из Рая (гл. роль), Горный Лук (Венецианский кинофестиваль), Умри и вспомни, Клубничная принцесса, Сапар и др.",
    phone: "+77019825292",
    email: "aj.newad@mail.ru",
    socialLinks: "instagram.com/azizaldam",
    canSwim: true,
  },
  {
    id: "a10",
    name: "МОМИНБАЕВ АЛЕМ МАРАТОВИЧ",
    gender: "male",
    birthDate: "2004-02-10",
    country: "Казахстан",
    city: "Алматы",
    previousTigerFilms: "Бишараки, Казахи против пришельцев, Телохранитель, Женатый Холостяк",
    education: "3 курса актерского мастерства (Таншолпан Кинжембетова, Жас Сахна, Роза Мукатаева)",
    currentStatus: "полностью свободен",
    heightCm: 185,
    weightKg: 63,
    clothingSize: "48-50",
    shoeSize: "43",
    eyeColor: "карий",
    hairColor: "брюнет",
    appearanceType: "азиатский",
    languages: "русский, английский",
    sports: "плавание, боевые искусства, лыжный спорт",
    portfolio: "Первая отрицательная, Казахи против пришельцев, Бишарашки, Было Дело КТК, Убийство в ресторане Шахристан, 1286, Телохранитель Tiger Films, Таргет и др.",
    theater: "Театр Жас Сахна, «Пианист», роль — пианист",
    phone: "+77012233102",
    email: "iazaa2go@gmail.com",
    socialLinks: "instagram.com/amominbayev",
    videoShowreel: "https://youtu.be/AJSVmPSc0NI",
  },
];

export function getActorAge(birthDate?: string): number | null {
  if (!birthDate) return null;
  const d = new Date(birthDate);
  if (isNaN(d.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - d.getFullYear();
  const m = today.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--;
  return age;
}

/** About company text from tigerfilms.kz/about-us/ — RU / KZ / EN */
export const aboutCompany = {
  ru: {
    title: "О нашей Компании",
    paragraph1: "Продюсерская компания Tiger Films была основана в 2021 году на базе кинотеатров Kinopark-Kinoplexx Theatres в целях производства полнометражных фильмов. За четыре года своего существования мы порадовали зрителей 47-ю фильмами.",
    paragraph2: "Наши фильмы высоко оценены на крупнейших мировых фестивалях и в международном кинопрокате.",
    teamTitle: "Наша Команда",
  },
  kz: {
    title: "Біздің компания туралы",
    paragraph1: "Tiger Films продюсерлік компаниясы 2021 жылы толықметражды фильмдер шығару мақсатында Kinopark-Kinoplexx Theatres кинотеатрлары негізінде құрылды. Төрт жыл ішінде біз көрермендерді 47 фильммен ләззаттандырдық.",
    paragraph2: "Біздің фильмдер әлемнің ірі фестивальдары мен халықаралық кинопрокатта жоғары бағаланған.",
    teamTitle: "Біздің команда",
  },
  en: {
    title: "About Our Company",
    paragraph1: "Tiger Films production company was founded in 2021 on the basis of Kinopark-Kinoplexx Theatres cinemas for the production of feature films. In four years we have released 47 films for audiences.",
    paragraph2: "Our films have been highly acclaimed at major international festivals and in theatrical distribution worldwide.",
    teamTitle: "Our Team",
  },
};

/** Leadership from tigerfilms.kz/about-us/ */
export const leadershipTeam: LeadershipMember[] = [
  { id: "l1", nameRu: "Акбота Кайсенова", roleRu: "Генеральный директор", roleKz: "Бас директор", roleEn: "Chief Executive Officer" },
  { id: "l2", nameRu: "Бибижамал Бекенова", roleRu: "Заместитель директора", roleKz: "Директордың орынбасары", roleEn: "Deputy Director" },
  { id: "l3", nameRu: "Ерлан Бухарбаев", roleRu: "Генеральный продюсер", roleKz: "Бас продюсер", roleEn: "General Producer" },
  { id: "l4", nameRu: "Руслан Абилов", roleRu: "Продюсер", roleKz: "Продюсер", roleEn: "Producer" },
  { id: "l5", nameRu: "Дамир Едилов", roleRu: "Продюсер", roleKz: "Продюсер", roleEn: "Producer" },
];

export function getLeadershipRole(member: LeadershipMember, lang: Lang): string {
  if (lang === "kz" && member.roleKz) return member.roleKz;
  if (lang === "en" && member.roleEn) return member.roleEn;
  return member.roleRu;
}

export function getLeadershipName(member: LeadershipMember, lang: Lang): string {
  if (lang === "kz" && member.nameKz) return member.nameKz;
  if (lang === "en" && member.nameEn) return member.nameEn;
  return member.nameRu;
}

export const films: Film[] = [
  // Наши новинки (from tigerfilms.kz)
  {
    id: "1",
    titleRu: "Руың кім?",
    titleKz: "Руың кім?",
    releaseDate: "2025-12-11",
    genre: "Семейная комедия",
    duration: "01 ч. 25 м.",
    ageRating: "12+",
    language: "Казахский / Русские субтитры",
    youtubeVideoId: "8V93crFqh1o",
    isNew: true,
    description: "Остроумная комедия о том, что происходит, когда твои корни оказываются совсем не такими, как ты думал. Род, происхождение, традиции — вещи, которые кажутся нерушимыми, но одна маленькая ошибка может изменить всё! Смех, интриги и поиск себя в фильме, который раскрывает тайны национального кода казахов.",
  },
  {
    id: "2",
    titleRu: "Назад в 90-ые. Я вернусь.",
    releaseDate: "2025-10-16",
    genre: "Комедия, Фантастика, мелодрама",
    ageRating: "14+",
    language: "Казахский / Русские субтитры",
    youtubeVideoId: "TZUDsPF3QgI",
    isNew: true,
  },
  {
    id: "3",
    titleRu: "Аменгер",
    releaseDate: "2025-09-18",
    genre: "Драма",
    ageRating: "",
    language: "Казахский / Русские субтитры",
    youtubeVideoId: "Dnz40xu7iBo",
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
    youtubeVideoId: "siLc_8SM-1E",
    isNew: true,
  },
  {
    id: "5",
    titleRu: "Сын Богача",
    titleKz: "Байдың баласы",
    releaseDate: "2025-07-17",
    genre: "Семейная комедия",
    duration: "01 ч. 20 м.",
    ageRating: "6+",
    language: "Казахский",
    youtubeVideoId: "H7GIuk8EBB4",
    isNew: true,
  },
  // Остальные фильмы (from tigerfilms.kz Наши фильмы)
  {
    id: "6",
    titleRu: "Женюсь на дочке богача",
    titleKz: "Байдың қызын аламын",
    releaseDate: "2023-09-21",
    genre: "Комедия",
    ageRating: "12+",
    language: "Казахский",
    youtubeVideoId: "DYW6qkxoG1k",
  },
  {
    id: "7",
    titleRu: "Казахи против пришельцев",
    releaseDate: "2022-08-04",
    genre: "Комедия",
    ageRating: "12+",
    language: "Казахский",
    youtubeVideoId: "zHbK91vVFrw",
  },
  {
    id: "8",
    titleRu: "Хам кафе",
    releaseDate: "2024-06-13",
    genre: "Комедия",
    ageRating: "12+",
    language: "Казахский",
    youtubeVideoId: "MwBEWj-DpC8",
  },
  {
    id: "9",
    titleRu: "Қайын ата VS Күйеубала",
    releaseDate: "2025-05-01",
    genre: "Комедия",
    ageRating: "12+",
    language: "Казахский",
    youtubeVideoId: "45IOpwD12ck",
  },
  {
    id: "10",
    titleRu: "Қапқарашка. Кубадан сәлем!",
    releaseDate: "2024-07-18",
    genre: "Комедия",
    ageRating: "6+",
    language: "Казахский",
    youtubeVideoId: "83smktV7D48",
  },
  {
    id: "11",
    titleRu: "Женатый холостяк",
    releaseDate: "2022-09-22",
    genre: "Комедия",
    ageRating: "12+",
    language: "Казахский",
    youtubeVideoId: "Zvwt4MiARwE",
  },
  {
    id: "12",
    titleRu: "НВП ағай",
    releaseDate: "2024-05-02",
    genre: "Комедия",
    ageRating: "12+",
    language: "Казахский",
    youtubeVideoId: "fraJ2yGY8r4",
  },
  {
    id: "13",
    titleRu: "Воришки",
    releaseDate: "2023-12-14",
    genre: "Комедия",
    ageRating: "12+",
    language: "Казахский",
    youtubeVideoId: "pG-57835hxY",
  },
  {
    id: "14",
    titleRu: "Ағашки по вызову",
    releaseDate: "2022-01-27",
    genre: "Комедия",
    ageRating: "12+",
    language: "Казахский",
    youtubeVideoId: "U8_3z235J_0",
  },
  {
    id: "15",
    titleRu: "Когда ты женишься?",
    titleKz: "Қашан үйленесің",
    releaseDate: "2024-04-08",
    genre: "Комедия, мелодрама",
    ageRating: "12+",
    language: "Казахский",
    youtubeVideoId: "BL05E84PkHA",
  },
  {
    id: "16",
    titleRu: "Моя большая казахская семья: Операция «Бажухи»",
    releaseDate: "2023-01-19",
    genre: "Комедия",
    ageRating: "12+",
    language: "Казахский",
    youtubeVideoId: "Rm0tjT3YWgQ",
  },
  {
    id: "17",
    titleRu: "Ауылбайский участковый",
    releaseDate: "2023-04-20",
    genre: "Комедия",
    ageRating: "12+",
    language: "Казахский",
    youtubeVideoId: "bFpEMp5AbEc",
  },
  {
    id: "18",
    titleRu: "Дядюшка Мороз",
    titleKz: "Аяз аға",
    releaseDate: "2023-12-14",
    genre: "Семейная комедия",
    ageRating: "6+",
    language: "Казахский",
    youtubeVideoId: "fOct2pCSwcQ",
  },
  {
    id: "19",
    titleRu: "Бишарашки 2: Общага",
    releaseDate: "2023-12-28",
    genre: "Комедия",
    ageRating: "12+",
    language: "Казахский",
    youtubeVideoId: "Xf2kFDRCgvs",
  },
  {
    id: "20",
    titleRu: "Бишарашки в Таиланде",
    releaseDate: "2024-12-26",
    genre: "Комедия",
    ageRating: "12+",
    language: "Казахский",
    youtubeVideoId: "3-mlsDJjpHM",
  },
  // Дополнительные фильмы с сайта (из блока новинки и каталога)
  {
    id: "21",
    titleRu: "Мой джинн 2: Тайные желания",
    titleKz: "Жыным сол 2",
    releaseDate: "2024-01-18",
    genre: "Комедия, фэнтези",
    ageRating: "12+",
    language: "Казахский",
    youtubeVideoId: "Pz6wWUoiiyI",
  },
  {
    id: "22",
    titleRu: "Коршілер",
    releaseDate: "2024-07-04",
    genre: "Драма",
    ageRating: "16+",
    language: "Казахский",
    youtubeVideoId: "Pz6wWUoiiyI",
  },
  {
    id: "23",
    titleRu: "Бешбармак (Бесбармак)",
    releaseDate: "2023-10-26",
    genre: "Комедия",
    ageRating: "12+",
    language: "Казахский",
    youtubeVideoId: "Pz6wWUoiiyI",
  },
];

/** Trailers — video IDs from tigerfilms.kz embed URLs */
export const trailers: Trailer[] = [
  { videoId: "8V93crFqh1o", title: "Руың кім? — Трейлер", filmId: "1" },
  { videoId: "TZUDsPF3QgI", title: "Назад в 90-ые. Я вернусь — Трейлер", filmId: "2" },
  { videoId: "Dnz40xu7iBo", title: "Аменгер — Трейлер", filmId: "3" },
  { videoId: "siLc_8SM-1E", title: "Укради, если сможешь — Трейлер", filmId: "4" },
  { videoId: "H7GIuk8EBB4", title: "Сын Богача — Трейлер", filmId: "5" },
  { videoId: "DYW6qkxoG1k", title: "Женюсь на дочке богача — Трейлер", filmId: "6" },
  { videoId: "zHbK91vVFrw", title: "Казахи против пришельцев — Трейлер", filmId: "7" },
  { videoId: "45IOpwD12ck", title: "Қайын ата VS Күйеубала — Трейлер", filmId: "9" },
  { videoId: "fraJ2yGY8r4", title: "НВП ағай — Трейлер", filmId: "12" },
  { videoId: "3-mlsDJjpHM", title: "Бишарашки в Таиланде — Трейлер", filmId: "20" },
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
    excerpt: "Оскаровский комитет Казахстана выбрал фильм «Кадет» претендентом на премию Американской киноакадемии.",
    titleKz: "«Кадет» фильмі «Оскар» сыйлығында Қазақстанды өкілдейді",
    excerptKz: "Қазақстанның Оскар комитеті «Кадет» фильмін Америка кино академиясының сыйлығына ұсынуды таңдады.",
    titleEn: "Film «Cadet» to Represent Kazakhstan at the Oscars",
    excerptEn: "Kazakhstan's Oscar Committee has selected the film «Cadet» as the country's entry for the Academy Awards.",
    bodyRu: "Оскаровский комитет Казахстана выбрал фильм «Кадет» претендентом на премию Американской киноакадемии.\n\nОскаровский комитет Казахстана завершил национальный отбор фильмов для участия в премии «Оскар», которая пройдет в 2026 году. Большинством голосов членами комитета был выбран художественный фильм режиссёра Адильхана Ержанова «Кадет». Картина будет представлять Казахстан в номинации «Лучший международный полнометражный фильм» (Best International Feature Film).\n\nХудожественный фильм «Кадет» был снят в 2024 году кинокомпанией «Tiger Films».",
    bodyKz: "Қазақстанның Оскар комитеті «Кадет» фильмін Америка кино академиясының сыйлығына ұсынуды таңдады.\n\nҚазақстанның Оскар комитеті 2026 жылы өтесі күтілетін «Оскар» сыйлығына қатысу үшін фильмдердің ұлттық іріктеуін аяқтады. Комитет мүшелерінің көпшілік дауысымен режиссер Әділхан Ержановтың «Кадет» көркем фильмі таңдалды. Картина «Халықаралық толықметражды үздік фильм» номинациясында Қазақстанды өкілдейді.\n\n«Кадет» көркем фильмі 2024 жылы «Tiger Films» кинокомпаниясы түсірген.",
    bodyEn: "Kazakhstan's Oscar Committee has selected the film «Cadet» as the country's entry for the Academy Awards.\n\nThe Committee completed the national selection of films for the 2026 Oscars. By majority vote, Adilkhan Yerzhanov's feature film «Cadet» was chosen. The film will represent Kazakhstan in the Best International Feature Film category.\n\nThe feature film «Cadet» was produced in 2024 by Tiger Films.",
    date: "2025-10-02",
    slug: "kadet-oscar",
    commentsCount: 12,
    sourceUrl: "https://tigerfilms.kz/blog19/",
  },
  {
    id: "n2",
    title: "В Алматы прошла премьера нового отечественного фильма «Қолыңнан келсе алып қаш»",
    excerpt: "20 августа в кинотеатре Kinoplexx Sary Arka состоялся премьерный показ семейной комедии с участием съемочной команды и звёзд.",
    titleKz: "Алматыда «Қолыңнан келсе алып қаш» фильмінің премьерасы өтті",
    excerptKz: "20 тамызда Kinoplexx Sary Arka кинотеатрында тұжырымдамалық команда мен жұлдыздар қатысқан отбасылық комедияның премьерасы өтті.",
    titleEn: "Almaty Hosted Premiere of New Local Film «Қolыңnan kelse alyp qash»",
    excerptEn: "On August 20, Kinoplexx Sary Arka hosted the premiere of a family comedy with the cast and celebrities in attendance.",
    bodyRu: "20 августа в кинотеатре Kinoplexx Sary Arka (пр. Алтынсарина 24а) состоялся премьерный показ семейной комедии от продюсерской студии OMG, при участии съемочной команды, звезд эстрады и кинематографа.\n\nСамал — 35-летняя жизнерадостная, обеспеченная, но очень суеверная женщина, которая не спешит выходить замуж. Она регулярно посещает свою гадалку Розу, которой доверяет больше, чем родной маме. Однажды та сообщает ей судьбоносную весть: ей пришел знак свыше о будущем муже Самал. Если она не найдет его и не выйдет за него замуж, ее ждет несчастливая жизнь. Поддавшись мистическому предсказанию, Самал уговаривает своих верных подруг отправиться на поиски мужчины, которого ведет ей судьба. Следуя загадочным знакам, подруги оказываются в небольшом ауле, где все улики приводят их к простому, но очень благородному сельскому мужчине по имени Бақыт.\n\nГлавные роли сыграли Зарина Кармен, Айшолпан Байтүгел, Қанат Тасхан, Жансая Мұратбекқызы, Азамат Рзагалиев, Марат Алибаев и др. Режиссер — Дархан Саркенов. Генеральный продюсер — Алмат Шадмат и продюсерская компания Our Media Group.",
    bodyKz: "20 тамызда Kinoplexx Sary Arka кинотеатрында (Алтынсарин даңғылы 24а) OMG продюсерлік студиясының тұжырымдамалық команда мен эстрада жұлдыздары қатысқан отбасылық комедияның премьералық көрсетілімі өтті.\n\nСамал — 35 жастағы қуанышты, бейберекет, бірақ өте ырымшыл әйел, ол үйленуге асығады. Ол гадалка Розаға үнемі барып, оған өз анасынан көп сенеді. Бір күні Роза оған тағдырлық хабар жеткізеді: Самалға болашақ күйеуі туралы жоғарыдан белгі келген. Егер ол оны тауып үйленбесе, бақытсыз өмір күтеді. Самал серіктерін тағдыр алып жүрген ер адамды іздеуге көндіреді. Жаңа фильмде басты рөлдерді Зарина Кармен, Айшолпан Байтүгел, Қанат Тасхан, Жансая Мұратбекқызы және т.б. ойнады. Режиссер — Дархан Саркенов.",
    bodyEn: "On August 20, Kinoplexx Sary Arka (24a Altynsarin Ave.) hosted the premiere of a family comedy by OMG production studio, with the film crew and celebrities in attendance.\n\nSamal is a 35-year-old cheerful, well-off but highly superstitious woman in no rush to marry. She regularly visits her fortune-teller Roza, whom she trusts more than her own mother. One day Roza delivers a fateful message: Samal has received a sign from above about her future husband. If she does not find him and marry him, an unhappy life awaits. Yielding to the mystical prediction, Samal convinces her friends to set out in search of the man fate has chosen. The lead roles are played by Zarina Carmen, Aisholpan Baitugel, Kanat Taskhan, Zhansaya Muratbekkyzy, and others. Director — Darkhan Sarkenov.",
    date: "2025-08-23",
    slug: "premjera-almaty",
    commentsCount: 8,
    sourceUrl: "https://tigerfilms.kz/blog18/",
  },
  {
    id: "n3",
    title: "Комедия «Остров. Ұмытылмас саяхат» вышла на большой экран",
    excerpt: "Продюсерская компания Tiger Films представила приключенческую комедию. Премьера в HALYK IMAX Kinopark 16 в Алматы. Съёмки в Казахстане и Таиланде.",
    titleKz: "«Арал. Ұмытылмас саяхат» комедиясы үлкен экранға шықты",
    excerptKz: "Tiger Films продюсерлік компаниясы приключениелік комедияны таныстырды. Премьера Алматыдағы HALYK IMAX Kinopark 16-да. Қазақстан мен Таиландта түсірілді.",
    titleEn: "Comedy «Island. Unforgettable Journey» Released in Theatres",
    excerptEn: "Tiger Films presented an adventure comedy. Premiere at HALYK IMAX Kinopark 16 in Almaty. Filmed in Kazakhstan and Thailand.",
    bodyRu: "Продюсерская компания Tiger Films представила новую приключенческую комедию «Остров. Ұмытылмас саяхат». Премьера прошла в крупнейшем кинозале Центральной Азии HALYK IMAX Kinopark 16 в Алматы. Съёмки проходили в Казахстане и Таиланде. На показе побывала корреспондент «24KZ».\n\nВ центре сюжета — Жомарт и Камила. После того как бывший директор строительной компании обвинил их в крупном воровстве государственных средств, герои отправляются в Таиланд, чтобы доказать свою невиновность. Их ждут опасные приключения — от ядовитых насекомых до встреч с местными бандитами.\n\nМерей Махан, режиссёр: «Через эту комедию мы хотели показать важные проблемы общества. В фильме есть моменты, когда в новостях или соцсетях говорят о коррупции. Здесь много захватывающих поворотов сюжета.» Большая часть съёмок прошла на острове Самуи. Фильм длится 70 минут. «Остров. Ұмытылмас саяхат» идёт в кинотеатрах сети Kinopark и Kinoplexx по всей стране.\n\nАвторы: Алия Феликскызы, Абен Нарынбаев. Источник: 24.kz",
    bodyKz: "Tiger Films продюсерлік компаниясы «Арал. Ұмытылмас саяхат» жаңа приключениелік комедияны таныстырды. Премьера Алматыдағы Орта Азияның ең үлкен HALYK IMAX Kinopark 16 кинотеатрында өтті. Түсірілім Қазақстан мен Таиландта өтті.\n\nСюжеттің ортасында Жомарт пен Камила бар. Құрылыс компаниясының бұрыңғы директоры оларды мемлекеттік қаражатты үлкен ұрлықта айыптағаннан кейін кейіпкерлер кінәсіздігін дәлелдеу үшін Таиландқа жол тартады. Оларды улы жәндіктерден жергілікті бандиттермен кездесуге дейін қауіпті приключениелер күтеді.\n\nРежиссер Мерей Махан: «Бұл комедия арқылы қоғамның маңызды мәселелерін көрсеткіміз келді.» Түсірілімнің көп бөлігі Самуи аралында өтті. Фильм 70 минутқа созылады. Kinopark және Kinoplexx желісінде бүкіл ел бойынша көрсетілуде.",
    bodyEn: "Tiger Films presented the new adventure comedy «Island. Unforgettable Journey». The premiere took place at Central Asia's largest cinema, HALYK IMAX Kinopark 16 in Almaty. Filming was done in Kazakhstan and Thailand.\n\nAt the centre of the story are Zhomart and Kamila. After a former construction company director accuses them of large-scale embezzlement of state funds, the characters travel to Thailand to prove their innocence. They face dangerous adventures—from poisonous insects to run-ins with local gangsters.\n\nDirector Merey Makhan: «Through this comedy we wanted to show important issues in society.» Most of the filming took place on Koh Samui. The film runs 70 minutes. «Island. Unforgettable Journey» is now showing in Kinopark and Kinoplexx theatres nationwide.\n\nSource: 24.kz",
    date: "2025-05-29",
    slug: "ostrov-premiera",
    commentsCount: 24,
    sourceUrl: "https://tigerfilms.kz/blog17/",
  },
  {
    id: "n4",
    title: "Студия Tiger Films профинансирует съёмки продолжения «Сказа о розовом зайце»",
    excerpt: "Один из самых популярных фильмов получит продолжение. Сюжет второй части будет посвящён детям главных героев. Съёмки начнутся в Алматы весной.",
    titleKz: "Tiger Films студиясы «Қызыл қоян туралы жыры» сиквелінің түсірілімін қаржыландырады",
    excerptKz: "Ең танымал фильмдердің бірінің жалғасы шығады. Екінші бөлімнің сюжеті басты кейіпкерлердің балаларына арналады. Түсірілім көктемде Алматыда басталады.",
    titleEn: "Tiger Films to Finance Sequel of «The Tale of the Pink Hare»",
    excerptEn: "One of the most popular films is getting a sequel. The second part will focus on the main characters' children. Shooting to begin in Almaty in spring.",
    bodyRu: "О том, что один из самых популярных фильмов получит продолжение, стало известно в марте этого года на главной киностудии страны АО «Казахфильм» имени Ш. Айманова.\n\nДетали второй части пока не раскрываются, но по словам представителей студии Tiger Films, сюжет будет посвящён детям главных героев — Ерлана, Локо, Джеки. Написанием сценария занимаются Сержан Серикпай и Самат Сыржан, съёмки начнутся в Алматы в конце весны (апрель–май).\n\nГенеральный продюсер Tiger Films Ерлан Бухарбаев отметил, что зрителей ждёт интересная история с неожиданными поворотами и зрелищными экшн-сценами. Криминальная драма «Сказ о розовом зайце» вышла в прокат в 2010 году и стала одной из самых кассовых картин. Tiger Films была основана в 2021 году; на сегодня компания представила зрителям 47 картин.\n\nИсточник: esquire.kz",
    bodyKz: "Ең танымал фильмдердің бірінің жалғасы шығатыны жылына наурыз айында елдің басты «Қазақфильм» киностудиясында белгілі болды.\n\nЕкінші бөлімнің толық мазмұны әзірге ашылмаған, бірақ Tiger Films студиясының өкілдерінің айтуынша сюжет басты кейіпкерлердің — Ерлан, Локо, Джекидің балаларына арналады. Сценарийді Сержан Сәрікпай мен Самат Сыржан жазып жатыр, түсірілім көктемнің соңында Алматыда басталады.\n\n«Қызыл қоян туралы жыры» криминалды драмасы 2010 жылы прокатқа шығып, ең кассалық туындылардың біріне айналды. Tiger Films 2021 жылы құрылды; бүгінде компания 47 картинаны таныстырды.\n\nДереккөз: esquire.kz",
    bodyEn: "In March of this year it was announced at the national film studio «Kazakhfilm» that one of the country's most popular films would get a sequel.\n\nDetails of the second part are still under wraps, but according to Tiger Films, the plot will focus on the children of the main characters—Erlan, Loko, and Jackie. The script is being written by Serzhan Serikpay and Samat Syrzhan; shooting will begin in Almaty in late spring (April–May).\n\nGeneral Producer of Tiger Films Erlan Bukharbayev said audiences can expect an engaging story with unexpected twists and spectacular action. The crime drama «The Tale of the Pink Hare» was released in 2010 and became one of the highest-grossing films. Tiger Films was founded in 2021; to date the company has released 47 films.\n\nSource: esquire.kz",
    date: "2025-04-15",
    slug: "skaz-o-zayce",
    commentsCount: 5,
    sourceUrl: "https://tigerfilms.kz/blog16/",
  },
  {
    id: "n5",
    title: "90-е, остров, тамада: какие фильмы представит Tiger Films в 2025 году?",
    excerpt: "Обзор анонсированных премьер: «Қайын ата VS Күйеубала», «Остров», «Биік сезім», «Байдың баласы», «Назад в 90-е», «Руың кім?», «Бишарашки в Индии» и другие.",
    titleKz: "90-жылдар, арал, тамада: Tiger Films 2025 жылы қандай фильмдерді көрсетеді?",
    excerptKz: "Жарнамаланған премьералар шолуы: «Қайын ата VS Күйеубала», «Арал», «Биік сезім», «Байдың баласы», «90-жылдарға оралу», «Руың кім?», «Үндістандағы Бишарашки» және т.б.",
    titleEn: "The 90s, an Island, a Toastmaster: What Films Will Tiger Films Release in 2025?",
    excerptEn: "Overview of announced premieres: «Father-in-Law vs Son-in-Law», «Island», «High Feeling», «Rich Man's Son», «Back to the 90s», «Who Is Your Clan?», «Bisharashki in India», and more.",
    bodyRu: "Продюсерская компания Tiger Films готовит к выходу на большие экраны новые истории. Что увидят зрители до конца 2025 года?\n\n«Қайын ата VS Күйеубала» — история Толегена и его начальника Темирбека; премьера 1 мая. В конце мая — комедия «Остров. Ұмытылмас саяхат»: Жомарт отправляется в Таиланд; в кино с 29 мая. Ромком «Биік сезім» — 26 июня. «Байдың баласы» — 24 июля. «Тамада» с Дауреном Айдаркуловым — 18 сентября. «Назад в 90-е» — учитель физики и машина времени, премьера 9 октября. Чёрная комедия «Хайуандар» — 30 октября. «Руың кім?» — комедия о родственных корнях, в касте Кайрат Адилгерей, режиссёр Асет Жумакан; с 4 декабря. «Бишарашки в Индии. В поисках мамы» — 25 декабря.\n\nИсточник: esquire.kz",
    bodyKz: "Tiger Films продюсерлік компаниясы үлкен экрандарға жаңа тарихтарды дайындап жатыр. 2025 жылдың соңына дейін көрермендер не көреді?\n\n«Қайын ата VS Күйеубала» — Төлеген мен оның жетекшісі Темірбектің тарихы; премьера 1 мамырда. Мамыр айының соңында «Арал. Ұмытылмас саяхат» комедиясы: Жомарт Таиландқа жол тартады; 29 мамырдан бастап. «Биік сезім» ромкомы — 26 маусымда. «Байдың баласы» — 24 шілдеде. «Тамада» Даурен Айдарқұловпен — 18 қыркүйекте. «90-жылдарға оралу» — физика мұғалімі мен уақыт машинасы; 9 қазанда. «Руың кім?» — рулық тамырлар туралы комедия; 4 желтоқсаннан. «Үндістандағы Бишарашки. Ананы іздеу» — 25 желтоқсанда.\n\nДереккөз: esquire.kz",
    bodyEn: "Tiger Films is preparing new stories for the big screen. What will audiences see by the end of 2025?\n\n«Father-in-Law vs Son-in-Law» premieres May 1. Late May: comedy «Island. Unforgettable Journey» — Zhomart heads to Thailand; in theatres from May 29. Rom-com «High Feeling» — June 26. «Rich Man's Son» — July 24. «Toastmaster» with Dauen Aidarkulov — September 18. «Back to the 90s» — a physics teacher and a time machine; October 9. «Ruyń kim?» («Who Is Your Clan?») — a comedy about roots and identity, director Asset Zhumakan; from December 4. «Bisharashki in India. In Search of Mom» — December 25.\n\nSource: esquire.kz",
    date: "2025-03-01",
    slug: "tiger-films-2025",
    commentsCount: 18,
    sourceUrl: "https://tigerfilms.kz/blog15/",
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

/** Get title in given language (fallback to Russian) */
export function getNewsTitle(item: NewsItem, lang: Lang): string {
  if (lang === "kz" && item.titleKz) return item.titleKz;
  if (lang === "en" && item.titleEn) return item.titleEn;
  return item.title;
}

/** Get excerpt in given language */
export function getNewsExcerpt(item: NewsItem, lang: Lang): string {
  if (lang === "kz" && item.excerptKz) return item.excerptKz;
  if (lang === "en" && item.excerptEn) return item.excerptEn;
  return item.excerpt;
}

/** Get full body in given language */
export function getNewsBody(item: NewsItem, lang: Lang): string | undefined {
  if (lang === "kz" && item.bodyKz) return item.bodyKz;
  if (lang === "en" && item.bodyEn) return item.bodyEn;
  return item.bodyRu ?? item.excerpt;
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
