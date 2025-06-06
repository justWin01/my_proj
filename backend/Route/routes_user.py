from flask import Blueprint, request, jsonify
from Models import db, User
from datetime import datetime

routes_user = Blueprint('routes_user', __name__)

# ----------------------
# POST Route - Create User
# ----------------------
@routes_user.route('', methods=['POST'])
def create_user():
    data = request.get_json()

    if not data:
        return jsonify({'error': 'No input data provided'}), 400

    required_fields = ['username', 'email', 'password', 'full_name']
    missing_fields = [field for field in required_fields if field not in data]

    if missing_fields:
        return jsonify({'error': f'Missing fields: {", ".join(missing_fields)}'}), 400

    # Optional: add checks for existing user/email here

    new_user = User(
        username=data['username'],
        email=data['email'],
        password=data['password'],
        full_name=data['full_name'],
        join_date=datetime.utcnow(),  # or datetime.now()
        follower_count=0
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        'message': 'User created successfully',
        'user_id': new_user.user_id
    }), 201


# ----------------------
# GET Routes
# ----------------------
@routes_user.route('/<int:user_id>', methods=['GET'])
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

@routes_user.route('', methods=['GET'])
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

# ----------------------
# PUT Routes
# ----------------------
@routes_user.route('/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    data = request.get_json()

    if 'username' in data:
        user.username = data['username']
    if 'password' in data:
        user.password = data['password']

    db.session.commit()

    return jsonify({'message': 'User updated successfully'})

# ----------------------
# DELETE Routes
# ----------------------
@routes_user.route('/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({'message': 'User deleted successfully'})

@routes_user.route('/', methods=['DELETE'])
def delete_all_users():
    try:
        num_deleted = User.query.delete()
        db.session.commit()
        return jsonify({'message': f'All users deleted successfully. Count: {num_deleted}'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to delete users', 'details': str(e)}), 500
