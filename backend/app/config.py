from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql+asyncpg://localhost/tigerfilms"
    CORS_ORIGINS: str = "http://localhost:3000,http://localhost:3001,https://tiger-films.vercel.app"
    ADMIN_SECRET: str = "tiger-admin-2024"

    class Config:
        env_file = ".env"


settings = Settings()
