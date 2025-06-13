from flask import Flask
from Models import db
from Route.routes_user import routes_user
from Route.routes_four import routes_four
from flask_cors import CORS


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/FLASK'  # fix typo here
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app)

db.init_app(app)
app.register_blueprint(routes_user, url_prefix='/users')
app.register_blueprint(routes_four, url_prefix='/api')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0')

