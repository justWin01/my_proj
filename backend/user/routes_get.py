from flask import Blueprint, jsonify
from Models import User

get_user_routes = Blueprint('get_user_routes', __name__)

@get_user_routes.route('/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    user_data = {
        'user_id': user.user_id,
        'username': user.username,
        'email': user.email,
        'full_name': user.full_name,
        'join_date': user.join_date.strftime('%Y-%m-%d'),
        'follower_count': user.follower_count
    }
    return jsonify(user_data), 200

@get_user_routes.route('', methods=['GET'])
def get_all_users():
    users = User.query.all()
    users_list = []

    for user in users:
        users_list.append({
            'user_id': user.user_id,
            'username': user.username,
            'email': user.email,
            'full_name': user.full_name,
            'join_date': user.join_date.strftime('%Y-%m-%d') if user.join_date else None,
            'follower_count': user.follower_count
        })

    return jsonify(users_list), 200
