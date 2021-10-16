from fastapi import APIRouter

# We can delegate all calls to the /users route
# to be handled by this router. We can give the
# APIRouter arguments for the prefix /users for
# brevity and the users tag for the local docs info
router = APIRouter(
    prefix="/users",
    tags=["users"]
)

fake_user = {
    "first_name": "Arsene",
    "last_name": "Lupin",
    "email": "arsene.lupin@umami.com",
    "location": "Paris, France",
    "profile_picture": "",
    "recipe_driven": True
}

@router.get("/{user_id}")
async def get_user(user_id: int):
    fake_user["user_id"] = user_id
    return fake_user