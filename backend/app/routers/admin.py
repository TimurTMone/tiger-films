from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from ..database import get_db
from ..models import Actor, Film, News
from ..schemas import StatsResponse

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/stats", response_model=StatsResponse)
async def get_stats(db: AsyncSession = Depends(get_db)):
    total_actors = (await db.execute(select(func.count(Actor.id)))).scalar() or 0
    total_films = (await db.execute(select(func.count(Film.id)))).scalar() or 0
    total_news = (await db.execute(select(func.count(News.id)))).scalar() or 0

    # Actors by city
    city_rows = (await db.execute(
        select(Actor.city, func.count(Actor.id))
        .where(Actor.city.isnot(None))
        .group_by(Actor.city)
        .order_by(func.count(Actor.id).desc())
        .limit(15)
    )).all()

    # Actors by gender
    gender_rows = (await db.execute(
        select(Actor.gender, func.count(Actor.id))
        .group_by(Actor.gender)
    )).all()

    # Actors by appearance type
    appearance_rows = (await db.execute(
        select(Actor.appearance_type, func.count(Actor.id))
        .where(Actor.appearance_type.isnot(None))
        .group_by(Actor.appearance_type)
        .order_by(func.count(Actor.id).desc())
    )).all()

    return StatsResponse(
        total_actors=total_actors,
        total_films=total_films,
        total_news=total_news,
        actors_by_city={row[0]: row[1] for row in city_rows},
        actors_by_gender={row[0]: row[1] for row in gender_rows},
        actors_by_appearance={row[0] or "Unknown": row[1] for row in appearance_rows},
    )
