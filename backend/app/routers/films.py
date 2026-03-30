from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, or_

from ..database import get_db
from ..models import Film
from ..schemas import FilmResponse, FilmCreate

router = APIRouter(prefix="/films", tags=["films"])


@router.get("", response_model=list[FilmResponse])
async def list_films(
    search: str = Query(None),
    db: AsyncSession = Depends(get_db),
):
    query = select(Film)
    if search:
        pattern = f"%{search}%"
        query = query.where(
            or_(Film.title_ru.ilike(pattern), Film.genre.ilike(pattern))
        )
    films = (await db.execute(query.order_by(Film.id))).scalars().all()
    return [FilmResponse.model_validate(f) for f in films]


@router.get("/{film_id}", response_model=FilmResponse)
async def get_film(film_id: int, db: AsyncSession = Depends(get_db)):
    film = await db.get(Film, film_id)
    if not film:
        raise HTTPException(status_code=404, detail="Film not found")
    return FilmResponse.model_validate(film)


@router.post("", response_model=FilmResponse, status_code=201)
async def create_film(data: FilmCreate, db: AsyncSession = Depends(get_db)):
    film = Film(**data.model_dump())
    db.add(film)
    await db.commit()
    await db.refresh(film)
    return FilmResponse.model_validate(film)


@router.delete("/{film_id}", status_code=204)
async def delete_film(film_id: int, db: AsyncSession = Depends(get_db)):
    film = await db.get(Film, film_id)
    if not film:
        raise HTTPException(status_code=404, detail="Film not found")
    await db.delete(film)
    await db.commit()
