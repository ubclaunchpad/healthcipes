from sqlalchemy import Boolean, Column, Integer, VARCHAR, BLOB

from .database import Base

# Creating the User class as a subclass of Base
# will let us create the users table in
# app/routers/users.py
class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    first_name = Column(VARCHAR(50))
    last_name = Column(VARCHAR(50))
    email = Column(VARCHAR(50), unique=True, index=True)
    location = Column(VARCHAR(50))
    profile_picture = Column(BLOB)
    recipe_driven = Column(Boolean, default=True)