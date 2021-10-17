from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# TODO: Parameterize this
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://user:password@localhost:3306/db"

engine = create_engine(SQLALCHEMY_DATABASE_URL, pool_pre_ping=True, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()