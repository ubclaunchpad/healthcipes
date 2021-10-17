from sqlalchemy.orm import Session

from . import models, schemas

# We declare functions that the endpoints in app/routers/*.py
# use to interact with the tables in the database


def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(
        email=user.email,
        first_name= "",
        last_name="",
        location="",
        profile_picture="",
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.user_id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()
