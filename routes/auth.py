from flask import Blueprint, request, jsonify
from Models import db, User

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    # Validate input
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({'error': 'All fields are required'}), 400

    # Check for existing user
    if User.query.filter((User.username == username) | (User.email == email)).first():
        return jsonify({'error': 'Username or email already exists'}), 409

    # Create user
    new_user = User(username=username, email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201
