from pydantic import BaseModel
from typing import Union

# This defines the type Schema for classes like User
# For the database schema/models, see ./models.py
class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    user_id: int
    first_name: Union[str, None]
    last_name: Union[str, None]
    location: Union[str, None]
    profile_picture: Union[str, None]
    recipe_driven: bool

    class Config:
        orm_mode = True