from flask import Blueprint, request, jsonify
from Models import db, User

post_user_routes = Blueprint('post_user_routes', __name__)

@post_user_routes.route('/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.get_json()

    if not data:
        return jsonify({'error': 'No data provided'}), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    for field in ['username', 'email', 'password', 'full_name', 'follower_count']:
        if field in data:
            setattr(user, field, data[field])

    try:
        db.session.commit()
        return jsonify({'message': 'User updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Database update failed', 'details': str(e)}), 500
