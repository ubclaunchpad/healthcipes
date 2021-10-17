from fastapi import FastAPI
from .routers import users

app = FastAPI()
app.include_router(users.router)

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
