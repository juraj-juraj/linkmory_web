from typing import Optional

import logging
from fastapi import FastAPI, HTTPException, status, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


class UserInfo(BaseModel):
    name: str
    bio: Optional[str]
    link_fb: Optional[str]
    link_insta: Optional[str]
    link_linkedin: Optional[str]


users: dict[str, UserInfo] = dict()

logging.basicConfig(level=logging.INFO)
app = FastAPI()

from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    exc_str = f"{exc}".replace("\n", " ").replace("   ", " ")
    logging.error(f"{request}: {exc_str}")
    content = {"status_code": 10422, "message": exc_str, "data": None}
    return JSONResponse(content=content, status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)


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
