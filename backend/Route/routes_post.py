from flask import Blueprint, request, jsonify
from Models import db, User

post_user_routes = Blueprint('post_user_routes', __name__)

@post_user_routes.route('', methods=['POST'])
def create_user():
    data = request.get_json()

    if not data or not all(k in data for k in ('username', 'email', 'password')):
        return jsonify({'error': 'Missing required fields'}), 400

    new_user = User(
        username=data['username'],
        email=data['email'],
        password=data['password'],
        full_name=data.get('full_name')
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created', 'user_id': new_user.user_id}), 201
