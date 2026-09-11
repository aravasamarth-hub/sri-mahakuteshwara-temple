import asyncio
import logging
import os
from contextlib import asynccontextmanager
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from starlette.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

from lib.db import db_store
from routers.admin import router as admin_router
from routers.public import router as public_router

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

UPLOAD_DIR = ROOT_DIR / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize unified storage (MongoDB or local persistent SQLite)
    await db_store.init()
    logger.info("Temple database storage initialized successfully.")
    yield
    await db_store.close()
    logger.info("Temple database storage closed.")


app = FastAPI(
    title="Sri Kshetra Mahakuteshwara Temple API",
    description="Devotional portal backend for Darshan, Poojas, Pilgrim Rooms, Donations, and Admin Management",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS configuration
origins = os.environ.get("CORS_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins if origins != ["*"] else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files for uploaded payment receipts/screenshots
app.mount("/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")

# Include Routers
app.include_router(public_router)
app.include_router(admin_router)


@app.get("/api/status")
async def health_check():
    return {
        "status": "healthy",
        "service": "Sri Mahakuteshwara Temple API",
        "db": "connected",
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=8001, reload=True)
