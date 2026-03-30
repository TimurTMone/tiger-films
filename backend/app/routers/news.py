from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from ..database import get_db
from ..models import News
from ..schemas import NewsResponse, NewsCreate

router = APIRouter(prefix="/news", tags=["news"])


@router.get("", response_model=list[NewsResponse])
async def list_news(db: AsyncSession = Depends(get_db)):
    news = (await db.execute(select(News).order_by(News.id.desc()))).scalars().all()
    return [NewsResponse.model_validate(n) for n in news]


@router.get("/{slug}", response_model=NewsResponse)
async def get_news(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(News).where(News.slug == slug))
    news = result.scalar_one_or_none()
    if not news:
        raise HTTPException(status_code=404, detail="News not found")
    return NewsResponse.model_validate(news)


@router.post("", response_model=NewsResponse, status_code=201)
async def create_news(data: NewsCreate, db: AsyncSession = Depends(get_db)):
    news = News(**data.model_dump())
    db.add(news)
    await db.commit()
    await db.refresh(news)
    return NewsResponse.model_validate(news)
