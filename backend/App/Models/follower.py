from . import db
from datetime import datetime

class Follower(db.Model):
    __tablename__ = 'followers'

    follower_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), primary_key=True)
    date_followed = db.Column(db.Date, default=datetime.utcnow)
