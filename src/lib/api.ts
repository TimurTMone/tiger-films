const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://tiger-films-api.onrender.com";

export type ApiActor = {
  id: number;
  name: string;
  gender: string;
  birth_date: string | null;
  country: string;
  city: string | null;
  previous_tiger_films: string | null;
  education: string | null;
  additional_education: string | null;
  current_status: string | null;
  height_cm: number | null;
  weight_kg: number | null;
  clothing_size: string | null;
  shoe_size: string | null;
  eye_color: string | null;
  hair_color: string | null;
  appearance_type: string | null;
  appearance_notes: string | null;
  chronic_conditions: string | null;
  allergies: string | null;
  passport_visa: string | null;
  languages: string | null;
  vocal_timbre: string | null;
  choreography: string | null;
  musical_instruments: string | null;
  sports: string | null;
  other_skills: string | null;
  driving_license: string | null;
  portfolio: string | null;
  theater: string | null;
  tv_radio: string | null;
  agent: string | null;
  phone: string | null;
  phone_reserve: string | null;
  email: string | null;
  social_links: string | null;
  video_showreel: string | null;
  film_profiles: string | null;
  photo_profile: string | null;
  photo_full_face: string | null;
  photo_full_body: string | null;
  stunt_double: string | null;
  pacemaker: boolean;
  fractures_or_head_injury: string | null;
  can_swim: boolean;
  religious_rituals: string | null;
};

export type ApiActorListResponse = {
  actors: ApiActor[];
  total: number;
  page: number;
  per_page: number;
};

/** Fetch actors from the backend API */
export async function fetchActors(params: {
  page?: number;
  per_page?: number;
  search?: string;
  gender?: string;
  city?: string;
  appearance_type?: string;
}): Promise<ApiActorListResponse> {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.set("page", String(params.page));
  if (params.per_page) searchParams.set("per_page", String(params.per_page));
  if (params.search) searchParams.set("search", params.search);
  if (params.gender) searchParams.set("gender", params.gender);
  if (params.city) searchParams.set("city", params.city);
  if (params.appearance_type) searchParams.set("appearance_type", params.appearance_type);

  const res = await fetch(`${API_URL}/api/actors?${searchParams.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch actors");
  return res.json();
}

export async function fetchCities(): Promise<{ city: string; count: number }[]> {
  const res = await fetch(`${API_URL}/api/actors/cities`);
  if (!res.ok) throw new Error("Failed to fetch cities");
  return res.json();
}

export async function fetchAppearanceTypes(): Promise<{ type: string; count: number }[]> {
  const res = await fetch(`${API_URL}/api/actors/appearance-types`);
  if (!res.ok) throw new Error("Failed to fetch appearance types");
  return res.json();
}

/** Convert API actor to the Actor type used by the frontend components */
export function apiActorToActor(a: ApiActor) {
  return {
    id: String(a.id),
    name: a.name,
    gender: a.gender as "male" | "female",
    birthDate: a.birth_date || undefined,
    country: a.country || "Казахстан",
    city: a.city || "",
    previousTigerFilms: a.previous_tiger_films || undefined,
    education: a.education || undefined,
    additionalEducation: a.additional_education || undefined,
    currentStatus: a.current_status || undefined,
    heightCm: a.height_cm || undefined,
    weightKg: a.weight_kg || undefined,
    clothingSize: a.clothing_size || undefined,
    shoeSize: a.shoe_size || undefined,
    eyeColor: a.eye_color || undefined,
    hairColor: a.hair_color || undefined,
    appearanceType: a.appearance_type || undefined,
    appearanceNotes: a.appearance_notes || undefined,
    chronicConditions: a.chronic_conditions || undefined,
    allergies: a.allergies || undefined,
    passportVisa: a.passport_visa || undefined,
    languages: a.languages || undefined,
    vocalTimbre: a.vocal_timbre || undefined,
    choreography: a.choreography || undefined,
    musicalInstruments: a.musical_instruments || undefined,
    sports: a.sports || undefined,
    otherSkills: a.other_skills || undefined,
    drivingLicense: a.driving_license || undefined,
    portfolio: a.portfolio || undefined,
    theater: a.theater || undefined,
    tvRadio: a.tv_radio || undefined,
    agent: a.agent || undefined,
    phone: a.phone || undefined,
    phoneReserve: a.phone_reserve || undefined,
    email: a.email || undefined,
    socialLinks: a.social_links || undefined,
    videoShowreel: a.video_showreel || undefined,
    filmProfiles: a.film_profiles || undefined,
    photoProfile: a.photo_profile || undefined,
    photoFullFace: a.photo_full_face || undefined,
    photoFullBody: a.photo_full_body || undefined,
    stuntDouble: a.stunt_double || undefined,
    pacemaker: a.pacemaker || undefined,
    fracturesOrHeadInjury: a.fractures_or_head_injury || undefined,
    canSwim: a.can_swim || undefined,
    religiousRituals: a.religious_rituals || undefined,
  };
}
