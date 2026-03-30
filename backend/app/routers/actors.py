from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, or_

from ..database import get_db
from ..models import Actor
from ..schemas import ActorResponse, ActorListResponse, ActorCreate, ActorUpdate

router = APIRouter(prefix="/actors", tags=["actors"])


@router.get("", response_model=ActorListResponse)
async def list_actors(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    search: str = Query(None),
    gender: str = Query(None),
    city: str = Query(None),
    appearance_type: str = Query(None),
    db: AsyncSession = Depends(get_db),
):
    query = select(Actor)
    count_query = select(func.count(Actor.id))

    if search:
        pattern = f"%{search}%"
        filt = or_(
            Actor.name.ilike(pattern),
            Actor.city.ilike(pattern),
            Actor.languages.ilike(pattern),
            Actor.portfolio.ilike(pattern),
        )
        query = query.where(filt)
        count_query = count_query.where(filt)

    if gender:
        query = query.where(Actor.gender == gender)
        count_query = count_query.where(Actor.gender == gender)

    if city:
        query = query.where(Actor.city.ilike(f"%{city}%"))
        count_query = count_query.where(Actor.city.ilike(f"%{city}%"))

    if appearance_type:
        query = query.where(Actor.appearance_type.ilike(f"%{appearance_type}%"))
        count_query = count_query.where(Actor.appearance_type.ilike(f"%{appearance_type}%"))

    total = (await db.execute(count_query)).scalar() or 0
    offset = (page - 1) * per_page
    actors = (await db.execute(query.order_by(Actor.id).offset(offset).limit(per_page))).scalars().all()

    return ActorListResponse(
        actors=[ActorResponse.model_validate(a) for a in actors],
        total=total,
        page=page,
        per_page=per_page,
    )


@router.get("/cities")
async def list_cities(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Actor.city, func.count(Actor.id))
        .where(Actor.city.isnot(None))
        .group_by(Actor.city)
        .order_by(func.count(Actor.id).desc())
    )
    return [{"city": row[0], "count": row[1]} for row in result.all()]


@router.get("/appearance-types")
async def list_appearance_types(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Actor.appearance_type, func.count(Actor.id))
        .where(Actor.appearance_type.isnot(None))
        .group_by(Actor.appearance_type)
        .order_by(func.count(Actor.id).desc())
    )
    return [{"type": row[0], "count": row[1]} for row in result.all()]


@router.get("/{actor_id}", response_model=ActorResponse)
async def get_actor(actor_id: int, db: AsyncSession = Depends(get_db)):
    actor = await db.get(Actor, actor_id)
    if not actor:
        raise HTTPException(status_code=404, detail="Actor not found")
    return ActorResponse.model_validate(actor)


@router.post("", response_model=ActorResponse, status_code=201)
async def create_actor(data: ActorCreate, db: AsyncSession = Depends(get_db)):
    actor = Actor(**data.model_dump())
    db.add(actor)
    await db.commit()
    await db.refresh(actor)
    return ActorResponse.model_validate(actor)


@router.put("/{actor_id}", response_model=ActorResponse)
async def update_actor(actor_id: int, data: ActorUpdate, db: AsyncSession = Depends(get_db)):
    actor = await db.get(Actor, actor_id)
    if not actor:
        raise HTTPException(status_code=404, detail="Actor not found")
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(actor, key, value)
    await db.commit()
    await db.refresh(actor)
    return ActorResponse.model_validate(actor)


@router.delete("/{actor_id}", status_code=204)
async def delete_actor(actor_id: int, db: AsyncSession = Depends(get_db)):
    actor = await db.get(Actor, actor_id)
    if not actor:
        raise HTTPException(status_code=404, detail="Actor not found")
    await db.delete(actor)
    await db.commit()
