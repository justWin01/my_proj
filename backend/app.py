from flask import Flask, jsonify
from entity import db

app = Flask(__name__)


# Replace with your real MySQL credentials
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/Flask'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    print("✅ All tables created in the FLASK MySQL database.")
