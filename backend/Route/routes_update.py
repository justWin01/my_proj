from flask import Blueprint, request, jsonify
from Models import db, User

update_user_routes = Blueprint('update_user_routes', __name__)

@update_user_routes.route('/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    data = request.get_json()

    # Only allow updates to username and password
    if 'username' in data:
        user.username = data['username']
    if 'password' in data:
        user.password = data['password']

    db.session.commit()

    return jsonify({'message': 'User updated successfully'})
