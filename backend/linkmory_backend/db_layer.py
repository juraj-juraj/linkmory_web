from threading import Lock

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import sqlalchemy

Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True, unique=True)
    name = sqlalchemy.Column(sqlalchemy.String(50), nullable=False)
    bio = sqlalchemy.Column(sqlalchemy.String(200), nullable=True)
    link_fb = sqlalchemy.Column(sqlalchemy.String(200), nullable=True)
    link_insta = sqlalchemy.Column(sqlalchemy.String(200), nullable=True)
    link_linkedin = sqlalchemy.Column(sqlalchemy.String(200), nullable=True)


class UserMet(Base):
    __tablename__ = "met"

    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True)
    user_id_1 = sqlalchemy.Column(
        sqlalchemy.Integer, sqlalchemy.ForeignKey("users.id"), nullable=False
    )
    user_id_2 = sqlalchemy.Column(
        sqlalchemy.Integer, sqlalchemy.ForeignKey("users.id"), nullable=False
    )
    note = sqlalchemy.Column(sqlalchemy.String(200))

    def __repr__(self):
        return f"<Met(user_id_1={self.user_id_1}, user_id_2={self.user_id_2}, note={self.note})>"


class DbConnectorMeta(type):
    _instances: dict = {}
    _lock: Lock = Lock()

    def get(cls, *args, **kwargs):
        """
        Possible changes to the value of the `__init__` argument do not affect
        the returned instance.
        """
        with cls._lock:
            if cls not in cls._instances:
                instance = super().__call__(*args, **kwargs)
                cls._instances[cls] = instance
            else:
                if len(args) > 0 or len(kwargs) > 0:
                    raise Exception(f"{cls} is already constructed")
        return cls._instances[cls]


class DbConnector(metaclass=DbConnectorMeta):
    def __init__(self, host: str, port: int, username: str, password: str) -> None:
        global Base
        self.database_url = f"postgresql://{username}:{password}@{host}:{port}/linkmory"
        engine = create_engine(self.database_url)
        Base.metadata.create_all(engine)
        self.session = sessionmaker(bind=engine)()

        # TODO: create connection and tables, store session

    def __del__(self):
        self.session.close()
        # TODO: close connection

    def create_user(
        self, id: int, name: str, bio: str, link_fb: str, link_insta: str, link_linkedin: str
    ):
        ...
        # TODO: polymorphism make user, either using arguments or straight class, update user also

    def get_user(self, id: int): ...

    def get_met_users(self, id: int): ...

    def add_met_user(self, id_host: int, id_guest: int, note: str): ...

    def user_exists(self, id: int): ...


def create_session(host: str, port: int, username: str, password: str):
    DbConnector.get()
