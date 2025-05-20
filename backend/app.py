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

@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([
        {
            'user_id': u.user_id,
            'username': u.username,
            'email': u.email,
            'full_name': u.full_name,
            'join_date': u.join_date.isoformat()
        } for u in users
    ])

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
