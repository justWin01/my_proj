from . import db
from datetime import datetime

class Like(db.Model):
    __tablename__ = 'likes'

    like_id = db.Column(db.Integer, primary_key=True)
    like_date = db.Column(db.Date, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.post_id'), nullable=False)
