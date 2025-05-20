from flask import Flask, request, jsonify
from Models import db, User

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/FLASK'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

@app.route('/api/users', methods=['POST'])
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


@app.route('/api/users/<int:user_id>', methods=['GET'])
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

@app.route('/api/users', methods=['GET'])
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

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
