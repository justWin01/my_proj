from flask import Flask
from Models import db
from Route.routes_post import post_user_routes
from Route.routes_get import get_user_routes
#from Route.routes_update import post_user_routes

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/FLASK'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Register Blueprints
app.register_blueprint(post_user_routes, url_prefix='/api/users')
app.register_blueprint(get_user_routes, url_prefix='/api/users')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
