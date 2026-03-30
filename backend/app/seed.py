"""Seed database with actors from parsed spreadsheet JSON."""
import asyncio
import json
import os
import sys

from sqlalchemy import select, func

# Add parent to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app.database import async_session, init_db
from app.models import Actor, Film, News


# Map camelCase JSON keys to snake_case model fields
FIELD_MAP = {
    "name": "name",
    "gender": "gender",
    "birthDate": "birth_date",
    "country": "country",
    "city": "city",
    "previousTigerFilms": "previous_tiger_films",
    "education": "education",
    "additionalEducation": "additional_education",
    "currentStatus": "current_status",
    "heightCm": "height_cm",
    "weightKg": "weight_kg",
    "clothingSize": "clothing_size",
    "shoeSize": "shoe_size",
    "eyeColor": "eye_color",
    "hairColor": "hair_color",
    "appearanceType": "appearance_type",
    "appearanceNotes": "appearance_notes",
    "chronicConditions": "chronic_conditions",
    "allergies": "allergies",
    "passportVisa": "passport_visa",
    "languages": "languages",
    "vocalTimbre": "vocal_timbre",
    "choreography": "choreography",
    "musicalInstruments": "musical_instruments",
    "sports": "sports",
    "otherSkills": "other_skills",
    "drivingLicense": "driving_license",
    "portfolio": "portfolio",
    "theater": "theater",
    "tvRadio": "tv_radio",
    "agent": "agent",
    "phone": "phone",
    "phoneReserve": "phone_reserve",
    "email": "email",
    "socialLinks": "social_links",
    "videoShowreel": "video_showreel",
    "filmProfiles": "film_profiles",
    "photoProfile": "photo_profile",
    "photoFullFace": "photo_full_face",
    "photoFullBody": "photo_full_body",
    "stuntDouble": "stunt_double",
    "pacemaker": "pacemaker",
    "fracturesOrHeadInjury": "fractures_or_head_injury",
    "canSwim": "can_swim",
    "religiousRituals": "religious_rituals",
}


async def seed_actors(json_path: str):
    await init_db()

    with open(json_path, "r", encoding="utf-8") as f:
        actors_data = json.load(f)

    async with async_session() as session:
        existing = (await session.execute(select(func.count(Actor.id)))).scalar() or 0
        if existing > 0:
            print(f"Database already has {existing} actors. Skipping seed.")
            return

        count = 0
        for item in actors_data:
            row = {}
            for json_key, db_key in FIELD_MAP.items():
                val = item.get(json_key)
                if val == "" or val is None:
                    continue
                row[db_key] = val

            if not row.get("name"):
                continue

            actor = Actor(**row)
            session.add(actor)
            count += 1

            if count % 50 == 0:
                await session.flush()
                print(f"  Inserted {count} actors...")

        await session.commit()
        print(f"Seeded {count} actors total.")


async def seed_films():
    """Seed films from the existing data.ts static data."""
    await init_db()

    films_data = [
        {"title_ru": "Операция «Набат»", "release_date": "2025-02-20", "genre": "Боевик, Комедия", "duration": "1ч 47м", "age_rating": "16+", "language": "Казахский, Русский", "youtube_video_id": "h68hzR1BVWI", "is_new": True},
        {"title_ru": "Тоқал", "release_date": "2025-02-06", "genre": "Комедия", "duration": "1ч 30м", "age_rating": "16+", "language": "Казахский", "youtube_video_id": "EYVYXUaqUlw", "is_new": True},
        {"title_ru": "Казахи против пришельцев", "release_date": "2024-11-21", "genre": "Комедия", "duration": "1ч 40м", "age_rating": "12+", "language": "Казахский, Русский", "youtube_video_id": "3Xl_U2I13YI", "is_new": True},
        {"title_ru": "Билет из рая", "release_date": "2024-10-24", "genre": "Драма", "duration": "1ч 50м", "age_rating": "12+", "language": "Казахский", "youtube_video_id": "TDfWGv3sKME", "is_new": True},
        {"title_ru": "Подкидыш", "release_date": "2024-09-26", "genre": "Комедия, Семейный", "duration": "1ч 35м", "age_rating": "6+", "language": "Казахский, Русский", "youtube_video_id": "lJWBKNiRzUk", "is_new": True},
        {"title_ru": "Телохранитель", "release_date": "2024-08-15", "genre": "Боевик, Комедия", "duration": "1ч 45м", "age_rating": "16+", "language": "Казахский, Русский", "youtube_video_id": "kS8MCCG_EHE"},
        {"title_ru": "Бишарашки", "release_date": "2024-01-11", "genre": "Комедия", "duration": "1ч 30м", "age_rating": "12+", "language": "Казахский, Русский", "youtube_video_id": "Wy3lzwNYmDQ"},
        {"title_ru": "Женатый холостяк", "release_date": "2023-11-23", "genre": "Комедия", "duration": "1ч 38м", "age_rating": "16+", "language": "Казахский, Русский", "youtube_video_id": "n4M0AY5p9y0"},
        {"title_ru": "Боксер", "release_date": "2023-09-14", "genre": "Драма, Спорт", "duration": "1ч 52м", "age_rating": "12+", "language": "Казахский", "youtube_video_id": "7g7iDrlwH_w"},
        {"title_ru": "Жабайы", "release_date": "2023-03-09", "genre": "Семейный, Комедия", "duration": "1ч 28м", "age_rating": "6+", "language": "Казахский", "youtube_video_id": "WJq33rBFk-I"},
        {"title_ru": "Қаш", "release_date": "2022-10-13", "genre": "Драма", "duration": "1ч 45м", "age_rating": "16+", "language": "Казахский", "youtube_video_id": "1KBhQE6WCSQ"},
        {"title_ru": "Горный лук", "release_date": "2022-09-01", "genre": "Драма", "duration": "1ч 25м", "age_rating": "12+", "language": "Казахский", "youtube_video_id": "Ay36VOfDKXU"},
        {"title_ru": "1286", "release_date": "2022-06-30", "genre": "Боевик, Приключения", "duration": "1ч 40м", "age_rating": "16+", "language": "Казахский, Русский", "youtube_video_id": "4IqO5WqM7SU"},
        {"title_ru": "Оттегі", "release_date": "2022-05-12", "genre": "Драма", "duration": "1ч 48м", "age_rating": "12+", "language": "Казахский", "youtube_video_id": "TmUcW-r6KJU"},
        {"title_ru": "Научи меня жить", "release_date": "2022-02-17", "genre": "Комедия, Драма", "duration": "1ч 35м", "age_rating": "12+", "language": "Русский, Казахский", "youtube_video_id": "D5gGMuOKpFc"},
        {"title_ru": "Суд идёт", "release_date": "2022-03-10", "genre": "Комедия", "duration": "1ч 30м", "age_rating": "16+", "language": "Казахский, Русский", "youtube_video_id": "oTH9MrxIhXM"},
        {"title_ru": "Каникулы оффлайн", "release_date": "2019-12-26", "genre": "Комедия, Семейный", "duration": "1ч 32м", "age_rating": "6+", "language": "Казахский, Русский", "youtube_video_id": "gzKDAGz8FaM"},
        {"title_ru": "Перизат", "release_date": "2024-04-11", "genre": "Фэнтези, Драма", "duration": "1ч 40м", "age_rating": "12+", "language": "Казахский", "youtube_video_id": "3fLvTqZ-Jug"},
        {"title_ru": "Полигон", "release_date": "2023-06-01", "genre": "Драма, Военный", "duration": "1ч 55м", "age_rating": "16+", "language": "Казахский, Русский", "youtube_video_id": "u9E1-j2X2As"},
        {"title_ru": "Қажымұқан", "release_date": "2023-12-07", "genre": "Драма, Исторический", "duration": "2ч 05м", "age_rating": "12+", "language": "Казахский", "youtube_video_id": "SqHQBGbeq5I"},
        {"title_ru": "Замандастар", "release_date": "2024-06-20", "genre": "Комедия", "duration": "1ч 35м", "age_rating": "12+", "language": "Казахский", "youtube_video_id": "sCEv3x3ql94"},
        {"title_ru": "Остров", "release_date": "2024-12-12", "genre": "Приключения, Комедия", "duration": "1ч 42м", "age_rating": "12+", "language": "Казахский, Русский", "youtube_video_id": "0NV90Xe5L3Q"},
        {"title_ru": "Первая отрицательная", "release_date": "2024-07-04", "genre": "Комедия, Драма", "duration": "1ч 38м", "age_rating": "16+", "language": "Казахский, Русский", "youtube_video_id": "HhQBGEb-G7g"},
    ]

    async with async_session() as session:
        existing = (await session.execute(select(func.count(Film.id)))).scalar() or 0
        if existing > 0:
            print(f"Database already has {existing} films. Skipping seed.")
            return

        for fd in films_data:
            session.add(Film(**fd))
        await session.commit()
        print(f"Seeded {len(films_data)} films.")


async def main():
    seed_json = os.path.join(os.path.dirname(__file__), "..", "seed_data.json")
    if not os.path.exists(seed_json):
        print(f"Seed file not found: {seed_json}")
        print("Run the CSV parser first to generate seed_data.json")
        return

    await seed_actors(seed_json)
    await seed_films()
    print("Done!")


if __name__ == "__main__":
    asyncio.run(main())
