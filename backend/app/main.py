from fastapi import FastAPI, APIRouter
from starlette.middleware.cors import CORSMiddleware
from app.route import user, recipe, user_activity

router = APIRouter()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


app.include_router(user.router)
app.include_router(recipe.router)
app.include_router(user_activity.router)

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

