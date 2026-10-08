from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    ENVIRONMENT: str = "development"
    APP_NAME: str = "Jigar Rohit Portfolio API"
    APP_VERSION: str = "1.0.0"
    PORT: int = 8000
    HOST: str = "0.0.0.0"
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://localhost:4173",
    ]
    # Comma-separated extra origins for deployment (e.g., Render/Vercel frontend)
    ADDITIONAL_CORS_ORIGINS: str = ""
    RATE_LIMIT_CONTACT: str = "5/minute"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

    @property
    def cors_origins(self) -> List[str]:
        origins = list(self.ALLOWED_ORIGINS)
        if self.ADDITIONAL_CORS_ORIGINS:
            for o in self.ADDITIONAL_CORS_ORIGINS.split(","):
                clean = o.strip()
                if clean and clean not in origins:
                    origins.append(clean)
        return origins


settings = Settings()
