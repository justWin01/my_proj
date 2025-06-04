from flask import Blueprint, request, jsonify
from Models.user import User, db
from werkzeug.security import check_password_hash

routes_user = Blueprint('routes_user', __name__)

@routes_user.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.password, password):
        return jsonify({"message": "Login successful", "user_id": user.id})
    return jsonify({"error": "Invalid credentials"}), 401
