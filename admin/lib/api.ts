import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: { "Content-Type": "application/json" },
});

export type Actor = {
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
  phone: string | null;
  email: string | null;
  social_links: string | null;
  video_showreel: string | null;
  photo_profile: string | null;
  photo_full_face: string | null;
  photo_full_body: string | null;
  created_at: string | null;
};

export type ActorListResponse = {
  actors: Actor[];
  total: number;
  page: number;
  per_page: number;
};

export type Film = {
  id: number;
  title_ru: string;
  title_kz: string | null;
  release_date: string | null;
  genre: string | null;
  duration: string | null;
  age_rating: string | null;
  language: string | null;
  youtube_video_id: string | null;
  is_new: boolean;
};

export type Stats = {
  total_actors: number;
  total_films: number;
  total_news: number;
  actors_by_city: Record<string, number>;
  actors_by_gender: Record<string, number>;
  actors_by_appearance: Record<string, number>;
};

export async function getActors(params: {
  page?: number;
  per_page?: number;
  search?: string;
  gender?: string;
  city?: string;
  appearance_type?: string;
}): Promise<ActorListResponse> {
  const { data } = await api.get("/actors", { params });
  return data;
}

export async function getActor(id: number): Promise<Actor> {
  const { data } = await api.get(`/actors/${id}`);
  return data;
}

export async function updateActor(
  id: number,
  updates: Partial<Actor>
): Promise<Actor> {
  const { data } = await api.put(`/actors/${id}`, updates);
  return data;
}

export async function deleteActor(id: number): Promise<void> {
  await api.delete(`/actors/${id}`);
}

export async function getFilms(): Promise<Film[]> {
  const { data } = await api.get("/films");
  return data;
}

export async function getStats(): Promise<Stats> {
  const { data } = await api.get("/admin/stats");
  return data;
}
