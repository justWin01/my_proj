from flask import Flask
from Models import db
from Route.routes_user import routes_user

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/FLASK'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
app.register_blueprint(routes_user, url_prefix='/users')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
