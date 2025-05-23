from flask import Blueprint, jsonify
from Models import db, User

delete_user_routes = Blueprint('delete_user_routes', __name__)

@delete_user_routes.route('/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({'message': 'User deleted successfully'})

@delete_user_routes.route('/', methods=['DELETE'])
def delete_all_users():
    try:
        num_deleted = User.query.delete()
        db.session.commit()
        return jsonify({'message': f'All users deleted successfully. Count: {num_deleted}'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to delete users', 'details': str(e)}), 500
