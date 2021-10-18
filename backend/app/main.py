from fastapi import FastAPI
from app.indexer.tools import connect_mysql
from app.indexer.users import post_user, get_user
import logging
from starlette.middleware.cors import CORSMiddleware

defaultUser = {
    "userID": "testID",
    "username": "Test",
    "email": "test@test.com",
}

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"])

def init_conn():
    conn = connect_mysql()
    cursor = conn.cursor()
    return conn, cursor

@app.get("/")
async def root():
    return {"message": "An example GET"}

@app.post("/")
async def root():
    return {"message": "An example POST"}

@app.put("/")
async def root():
    return {"message": "An example PUT"}

@app.delete("/")
async def root():
    return {"message": "An example DELETE"}


@app.get("/user")
async def read_user(userID: str = ""):
    try:
        _, cursor = init_conn()
        res = get_user(cursor, userID)
        return res, 200

    except Exception as e:
        logging.error(e)
        return "Error with {}".format(e), 400


@app.post("/user")
async def create_user(user: dict = defaultUser):
    try:
        conn, cursor = init_conn()
        res = post_user(conn, cursor, user)
        return res, 200

    except Exception as e:
        logging.error(e)
        return "Error with {}".format(e), 400
