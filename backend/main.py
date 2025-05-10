from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from pydantic import BaseModel
import asyncio, redis.asyncio as redis
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

rds: redis.Redis | None = None 


class Channel(BaseModel):
    name: str


@app.on_event("startup")
async def startup() -> None:
    global rds
    rds = redis.from_url("redis://redis:6379", decode_responses=True)


@app.get("/channels", response_model=list[str])
async def list_channels() -> list[str]:
    return sorted(await rds.smembers("channels"))


@app.post("/channels", status_code=201)
async def create_channel(c: Channel) -> None:
    if not c.name:
        raise HTTPException(400, "Empty name")
    await rds.sadd("channels", c.name)


@app.websocket("/ws/{room}")
async def chat_ws(ws: WebSocket, room: str) -> None:
    await rds.sadd("channels", room)
    await ws.accept()
    pubsub = rds.pubsub()
    await pubsub.subscribe(room)

    # Send last 50 messages
    history = await rds.lrange(f"history:{room}", -50, -1)
    for msg in history:
        await ws.send_text(msg)

    async def forward():
        async for m in pubsub.listen():
            if m["type"] == "message":
                await ws.send_text(m["data"])

    task = asyncio.create_task(forward())
    try:
        while True:
            raw = await ws.receive_text()
            await rds.rpush(f"history:{room}", raw)
            await rds.ltrim(f"history:{room}", -50, -1)
            await rds.publish(room, raw)
    except WebSocketDisconnect:
        task.cancel()
        await pubsub.unsubscribe(room)