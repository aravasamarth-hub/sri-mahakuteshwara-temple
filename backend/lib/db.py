"""Database connection and unified document store.
Connects to MongoDB when available; seamlessly falls back to SQLite document store
if MongoDB is unreachable, ensuring flawless development & deployment.
"""

import asyncio
import json
import logging
import os
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List, Optional
from dotenv import load_dotenv

ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / ".env")

logger = logging.getLogger(__name__)

MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "mahakuta_temple")

mongo_client = None
mongo_db = None
_use_mongo = False
_sqlite_path = ROOT_DIR / "data" / "temple_store.db"


class StorageManager:
    """Unified asynchronous document store matching Motor/MongoDB conventions."""

    def __init__(self):
        self.use_mongo = False

    async def init(self):
        global mongo_client, mongo_db, _use_mongo
        try:
            from motor.motor_asyncio import AsyncIOMotorClient
            client = AsyncIOMotorClient(MONGO_URL, serverSelectionTimeoutMS=1500)
            # Ping database to test connectivity
            await client.admin.command("ping")
            mongo_client = client
            mongo_db = client[DB_NAME]
            self.use_mongo = True
            _use_mongo = True
            logger.info("Connected to live MongoDB at %s (database: %s)", MONGO_URL, DB_NAME)
        except Exception as err:
            self.use_mongo = False
            _use_mongo = False
            logger.warning("MongoDB not active (%s). Using local persistent SQLite document store.", err)
            _sqlite_path.parent.mkdir(parents=True, exist_ok=True)
            import aiosqlite
            async with aiosqlite.connect(_sqlite_path) as db:
                await db.execute("""
                    CREATE TABLE IF NOT EXISTS documents (
                        collection TEXT NOT NULL,
                        id TEXT NOT NULL,
                        data TEXT NOT NULL,
                        created_at TEXT NOT NULL,
                        PRIMARY KEY (collection, id)
                    )
                """)
                await db.commit()

    async def close(self):
        global mongo_client
        if mongo_client:
            mongo_client.close()

    async def insert_one(self, collection: str, doc: Dict[str, Any]) -> str:
        doc_id = str(doc.get("id") or doc.get("_id") or "")
        if self.use_mongo and mongo_db is not None:
            await mongo_db[collection].insert_one(doc)
            return doc_id
        else:
            import aiosqlite
            created_at = doc.get("createdAt") or doc.get("created_at") or datetime.utcnow().isoformat()
            async with aiosqlite.connect(_sqlite_path) as db:
                await db.execute(
                    "INSERT OR REPLACE INTO documents (collection, id, data, created_at) VALUES (?, ?, ?, ?)",
                    (collection, doc_id, json.dumps(doc, default=str), str(created_at))
                )
                await db.commit()
            return doc_id

    async def find(self, collection: str, query: Optional[Dict[str, Any]] = None, limit: int = 1000, sort_desc: bool = True) -> List[Dict[str, Any]]:
        query = query or {}
        if self.use_mongo and mongo_db is not None:
            sort_order = [("createdAt", -1)] if sort_desc else [("createdAt", 1)]
            cursor = mongo_db[collection].find(query).sort(sort_order).limit(limit)
            results = []
            async for item in cursor:
                if "_id" in item and "id" not in item:
                    item["id"] = str(item.pop("_id"))
                results.append(item)
            return results
        else:
            import aiosqlite
            order = "DESC" if sort_desc else "ASC"
            async with aiosqlite.connect(_sqlite_path) as db:
                async with db.execute(
                    f"SELECT data FROM documents WHERE collection = ? ORDER BY created_at {order} LIMIT ?",
                    (collection, limit)
                ) as cursor:
                    rows = await cursor.fetchall()
                    items = [json.loads(row[0]) for row in rows]
                    
            # Filter in-memory for basic queries if provided
            if query:
                filtered = []
                for item in items:
                    match = True
                    for k, v in query.items():
                        if item.get(k) != v:
                            match = False
                            break
                    if match:
                        filtered.append(item)
                return filtered
            return items

    async def find_one(self, collection: str, query: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        if self.use_mongo and mongo_db is not None:
            item = await mongo_db[collection].find_one(query)
            if item and "_id" in item and "id" not in item:
                item["id"] = str(item.pop("_id"))
            return item
        else:
            items = await self.find(collection, query=query, limit=1)
            return items[0] if items else None

    async def update_one(self, collection: str, query: Dict[str, Any], update: Dict[str, Any]) -> bool:
        if self.use_mongo and mongo_db is not None:
            res = await mongo_db[collection].update_one(query, update)
            return res.modified_count > 0 or res.matched_count > 0
        else:
            item = await self.find_one(collection, query)
            if not item:
                return False
            # Apply update ($set or plain dict)
            fields = update.get("$set", update)
            item.update(fields)
            await self.insert_one(collection, item)
            return True

    async def delete_one(self, collection: str, query: Dict[str, Any]) -> bool:
        if self.use_mongo and mongo_db is not None:
            res = await mongo_db[collection].delete_one(query)
            return res.deleted_count > 0
        else:
            import aiosqlite
            target_id = query.get("id")
            if not target_id:
                item = await self.find_one(collection, query)
                if not item:
                    return False
                target_id = item.get("id")
            async with aiosqlite.connect(_sqlite_path) as db:
                await db.execute(
                    "DELETE FROM documents WHERE collection = ? AND id = ?",
                    (collection, target_id)
                )
                await db.commit()
            return True

    async def count(self, collection: str, query: Optional[Dict[str, Any]] = None) -> int:
        if self.use_mongo and mongo_db is not None:
            return await mongo_db[collection].count_documents(query or {})
        else:
            items = await self.find(collection, query=query)
            return len(items)


db_store = StorageManager()
