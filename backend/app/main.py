from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .database import init_db
from .routers import actors, films, news, admin


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield


app = FastAPI(
    title="Tiger Films API",
    description="Backend API for Tiger Films casting database, films and news",
    version="1.0.0",
    lifespan=lifespan,
)

origins = [o.strip() for o in settings.CORS_ORIGINS.split(",")]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(actors.router, prefix="/api")
app.include_router(films.router, prefix="/api")
app.include_router(news.router, prefix="/api")
app.include_router(admin.router, prefix="/api")


@app.get("/health")
async def health():
    return {"status": "ok", "service": "tiger-films-api"}


@app.get("/")
async def root():
    return {
        "name": "Tiger Films API",
        "version": "1.0.0",
        "docs": "/docs",
    }
