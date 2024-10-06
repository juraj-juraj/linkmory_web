import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


class UserInfo(BaseModel):
    name: str
    bio: str | None
    link_fb: str | None
    link_insta: str | None
    link_linkedin: str | None


users: dict[str, UserInfo] = dict()

logging.basicConfig(level=logging.INFO)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React app's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/user/create/")
async def create_user(id: str, request: UserInfo) -> UserInfo:
    global users
    logging.info(f"Post id: {id}")
    users[id] = request
    return users[id]


@app.get("/api/user/info/")
async def get_user(id: str) -> UserInfo:
    global users
    id = str(id)
    logging.info(f"Get id: {id}")
    if id not in users:
        raise HTTPException(status_code=404, detail=f"User {id} does not exist")
    return users[id]
