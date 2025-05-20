from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Import all entities
from .user import User
from .post import Post
from .comment import Comment
from .like import Like
from .follower import Follower
