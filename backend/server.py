from typing import Optional
import requests
import re
from datetime import datetime

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
    id_fb: Optional[str]
    link_website: Optional[str]
    tel_number: Optional[str]
    email_address: Optional[str]
    user_created: Optional[int] = None  # seconds since epoch
    last_change: Optional[int] = None  # seconds since epoch


class UserInfoDump(UserInfo):
    id: str


class UserConnection(BaseModel):
    id_other: str
    connection_created: Optional[int] = None  # seconds since epoch
    note: Optional[str]


class UserConnectionDump(UserConnection):
    id: str


class UserConnectionResponse(UserConnection):
    person_name: Optional[str] = None


class DataDump(BaseModel):
    users: list[UserInfoDump]
    connections: list[UserConnectionDump]


class createResponse(BaseModel):
    return_message: str


class UserExists(BaseModel):
    exists: bool


users: dict[str, UserInfo] = dict()
connections: dict[str, list[UserConnection]] = dict()

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
    allow_origins=[
        "*",
    ],  # React app's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/user/create/")
async def create_user(id: str, request: UserInfo) -> createResponse:
    global users
    # Delete user if sent with blank name
    if not request.name:
        if id in users:
            del users[id]
            if connections.get(id):
                del connections[id]
            for connections_list in connections.values():
                for connection in connections_list:
                    if connection.id_other == id:
                        connections_list.remove(connection)
                        break
            logging.info(f"Deleting user {id}")
            return createResponse(return_message=f"User {id} deleted successfully")
        logging.info(f"Id {id} not created")
        return createResponse(return_message=f"User {id} does not exist")

    logging.info(f"Creating id: {id}")
    if request.link_insta:
        if request.link_insta.startswith(
            "https://www.instagram.com/"
        ) or request.link_insta.startswith("https://instagram.com/"):
            request.link_insta = re.sub(
                r"https://(www\.)?instagram\.com/", "", request.link_insta
            ).split("/")[0]
        request.link_insta = request.link_insta.replace("@", "", 1)

    if request.link_website:
        if request.link_website.startswith("https://") or request.link_website.startswith(
            "http://"
        ):
            pass  # URL is already correctly prefixed
        elif request.link_website.startswith("www."):
            request.link_website = f"https://{request.link_website}"
        else:
            request.link_website = f"https://www.{request.link_website}"

    if id not in users:
        request.user_created = int(datetime.now().timestamp())
    request.last_change = int(datetime.now().timestamp())

    users[id] = request
    return createResponse(return_message=f"User {id} created successfully")


@app.get("/api/user/info/")
async def get_user(id: str) -> UserInfo:
    global users
    id = str(id)
    logging.info(f"Get id: {id}")
    if id not in users:
        raise HTTPException(status_code=404, detail=f"User {id} does not exist")
    user = users[id].model_copy()
    if user.link_fb:
        fb_response = requests.get(user.link_fb, timeout=2)  # 5 seconds timeout
        if fb_response.status_code == 200:
            match = re.search(r'content="fb://profile/(\d+)"', fb_response.text)
            if match:
                user.id_fb = match.group(1)
    return user


@app.get("/api/admin/data_dump/")
async def dump_data() -> DataDump:
    global users
    global connections
    user_list = [UserInfoDump(id=id_user, **user.model_dump()) for id_user, user in users.items()]
    connection_list = [
        UserConnectionDump(id=id_user, **connection.model_dump())
        for id_user, connections in connections.items()
        for connection in connections
    ]
    return DataDump(users=user_list, connections=connection_list)


@app.post("/api/admin/load_data/")
async def load_data(data: DataDump) -> createResponse:
    global users
    global connections

    for user in data.users:
        users[user.id] = UserInfo(
            **{k: v for k, v in user.model_dump().items() if k in UserInfo.model_fields.keys()}
        )
        connections[user.id] = []

    for connection in data.connections:
        connections[connection.id].append(
            UserConnection(
                **{
                    k: v
                    for k, v in connection.model_dump().items()
                    if k in UserConnection.model_fields.keys()
                }
            )
        )
    return createResponse(return_message="Data loaded successfully")


@app.post("/api/user/connection/create/")
async def create_connection(id: str, request: UserConnection) -> createResponse:
    global connections
    if id not in users:
        raise HTTPException(status_code=404, detail=f"User {id} does not exist")
    if request.id_other not in users:
        raise HTTPException(status_code=404, detail=f"User {request.id_other} does not exist")
    request.connection_created = int(datetime.now().timestamp())
    if id not in connections:
        connections[id] = [request]
    else:
        connections[id].append(request)
    return createResponse(return_message=f"Connection created successfully")


@app.get("/api/user/connection/list/")
async def get_connections(id: str) -> list[UserConnectionResponse]:
    global connections
    if id not in users:
        raise HTTPException(status_code=404, detail=f"User {id} does not exist")
    user_connections = connections[id] if id in connections else []
    user_connections_response = []
    for connection in user_connections:
        user_connections_response.append(
            UserConnectionResponse(
                person_name=users[connection.id_other].name,
                **connection.model_dump(),
            )
        )
    return user_connections_response


@app.get("/api/user/connection/person")
async def get_connections_person(id: str, id_other: str) -> UserConnection:
    global connections
    if id not in users:
        raise HTTPException(status_code=404, detail=f"User {id} does not exist")
    if id_other not in users:
        raise HTTPException(status_code=404, detail=f"User {id_other} does not exist")
    user_connections = connections[id] if id in connections else []
    for connection in user_connections:
        if connection.id_other == id_other:
            return connection

    raise HTTPException(
        status_code=405, detail=f"Connection between {id} and {id_other} does not exist"
    )


@app.get("/api/user/exist/")
async def user_exists(id: str) -> UserExists:
    global users
    id = str(id)
    logging.info(f"User_exists: {id}")
    return UserExists(exists=id in users)


@app.get("/")
def read_root():
    return {"message": "API is working"}
