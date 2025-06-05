from flask import Blueprint, request, jsonify

user_routes = Blueprint('user_routes', __name__)

@user_routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    # Your login logic here (validate user, etc.)
    return jsonify({"message": "Login successful", "email": email})
