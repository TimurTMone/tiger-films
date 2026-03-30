from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ActorBase(BaseModel):
    name: str
    gender: str
    birth_date: Optional[str] = None
    country: str = "Казахстан"
    city: Optional[str] = None
    previous_tiger_films: Optional[str] = None
    education: Optional[str] = None
    additional_education: Optional[str] = None
    current_status: Optional[str] = None
    height_cm: Optional[int] = None
    weight_kg: Optional[int] = None
    clothing_size: Optional[str] = None
    shoe_size: Optional[str] = None
    eye_color: Optional[str] = None
    hair_color: Optional[str] = None
    appearance_type: Optional[str] = None
    appearance_notes: Optional[str] = None
    chronic_conditions: Optional[str] = None
    allergies: Optional[str] = None
    passport_visa: Optional[str] = None
    languages: Optional[str] = None
    vocal_timbre: Optional[str] = None
    choreography: Optional[str] = None
    musical_instruments: Optional[str] = None
    sports: Optional[str] = None
    other_skills: Optional[str] = None
    driving_license: Optional[str] = None
    portfolio: Optional[str] = None
    theater: Optional[str] = None
    tv_radio: Optional[str] = None
    agent: Optional[str] = None
    phone: Optional[str] = None
    phone_reserve: Optional[str] = None
    email: Optional[str] = None
    social_links: Optional[str] = None
    video_showreel: Optional[str] = None
    film_profiles: Optional[str] = None
    photo_profile: Optional[str] = None
    photo_full_face: Optional[str] = None
    photo_full_body: Optional[str] = None
    stunt_double: Optional[str] = None
    pacemaker: bool = False
    fractures_or_head_injury: Optional[str] = None
    can_swim: bool = False
    religious_rituals: Optional[str] = None
    producer_notes: Optional[str] = None


class ActorCreate(ActorBase):
    pass


class ActorUpdate(BaseModel):
    name: Optional[str] = None
    gender: Optional[str] = None
    birth_date: Optional[str] = None
    country: Optional[str] = None
    city: Optional[str] = None
    previous_tiger_films: Optional[str] = None
    education: Optional[str] = None
    additional_education: Optional[str] = None
    current_status: Optional[str] = None
    height_cm: Optional[int] = None
    weight_kg: Optional[int] = None
    clothing_size: Optional[str] = None
    shoe_size: Optional[str] = None
    eye_color: Optional[str] = None
    hair_color: Optional[str] = None
    appearance_type: Optional[str] = None
    appearance_notes: Optional[str] = None
    chronic_conditions: Optional[str] = None
    allergies: Optional[str] = None
    passport_visa: Optional[str] = None
    languages: Optional[str] = None
    vocal_timbre: Optional[str] = None
    choreography: Optional[str] = None
    musical_instruments: Optional[str] = None
    sports: Optional[str] = None
    other_skills: Optional[str] = None
    driving_license: Optional[str] = None
    portfolio: Optional[str] = None
    theater: Optional[str] = None
    tv_radio: Optional[str] = None
    agent: Optional[str] = None
    phone: Optional[str] = None
    phone_reserve: Optional[str] = None
    email: Optional[str] = None
    social_links: Optional[str] = None
    video_showreel: Optional[str] = None
    film_profiles: Optional[str] = None
    photo_profile: Optional[str] = None
    photo_full_face: Optional[str] = None
    photo_full_body: Optional[str] = None
    stunt_double: Optional[str] = None
    pacemaker: Optional[bool] = None
    fractures_or_head_injury: Optional[str] = None
    can_swim: Optional[bool] = None
    religious_rituals: Optional[str] = None
    producer_notes: Optional[str] = None


class ActorResponse(ActorBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class ActorListResponse(BaseModel):
    actors: list[ActorResponse]
    total: int
    page: int
    per_page: int


class FilmBase(BaseModel):
    title_ru: str
    title_kz: Optional[str] = None
    release_date: Optional[str] = None
    genre: Optional[str] = None
    duration: Optional[str] = None
    age_rating: Optional[str] = None
    language: Optional[str] = None
    poster: Optional[str] = None
    youtube_video_id: Optional[str] = None
    is_new: bool = False
    description: Optional[str] = None


class FilmCreate(FilmBase):
    pass


class FilmResponse(FilmBase):
    id: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class NewsBase(BaseModel):
    title_ru: str
    title_kz: Optional[str] = None
    title_en: Optional[str] = None
    excerpt_ru: Optional[str] = None
    excerpt_kz: Optional[str] = None
    excerpt_en: Optional[str] = None
    body_ru: Optional[str] = None
    body_kz: Optional[str] = None
    body_en: Optional[str] = None
    date: Optional[str] = None
    image: Optional[str] = None
    slug: str
    comments_count: int = 0
    source_url: Optional[str] = None


class NewsCreate(NewsBase):
    pass


class NewsResponse(NewsBase):
    id: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class StatsResponse(BaseModel):
    total_actors: int
    total_films: int
    total_news: int
    actors_by_city: dict[str, int]
    actors_by_gender: dict[str, int]
    actors_by_appearance: dict[str, int]
