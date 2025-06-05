from flask import Flask
from flask_cors import CORS
from Models import db
from Route.routes_user import user_routes

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/FLASK'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Register the blueprint
app.register_blueprint(user_routes, url_prefix='/user')

if __name__ == '__main__':
    app.run(debug=True)
