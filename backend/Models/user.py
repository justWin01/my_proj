from . import db
from datetime import datetime


class User(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    full_name = db.Column(db.String(100))
    join_date = db.Column(db.Date, default=datetime.utcnow)
    follower_count = db.Column(db.Integer, default=0)

    posts = db.relationship('Post', backref='user', lazy=True)
    comments = db.relationship('Comment', backref='user', lazy=True)
    likes = db.relationship('Like', backref='user', lazy=True)
    followers = db.relationship('Follower', backref='followed', lazy=True, foreign_keys='Follower.user_id')
    following = db.relationship('Follower', backref='follower', lazy=True, foreign_keys='Follower.follower_id')

