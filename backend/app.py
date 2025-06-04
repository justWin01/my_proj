from flask import Flask
from flask_cors import CORS
from Models.user import db
from Route.routes_user import routes_user

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from Expo

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@localhost/FLASK'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

app.register_blueprint(routes_user, url_prefix='/user')

if __name__ == '__main__':
    app.run(debug=True)
