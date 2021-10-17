from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session

from ..db import crud, models, schemas, database
from ..deps import get_db

# This line creates the tables based on the subclasses of
# of Base we created in app/db/models.py
models.Base.metadata.create_all(bind=database.engine)

# We can delegate all calls to the /users route
# to be handled by this router. We can give the
# APIRouter arguments for the prefix /users for
# brevity and the users tag for the local docs info
router = APIRouter(
    prefix="/users",
    tags=["users"]
)


@router.post("/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)

@router.get("/{user_id}", response_model=schemas.User)
async def get_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user