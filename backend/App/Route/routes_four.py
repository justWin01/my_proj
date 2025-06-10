from flask import Blueprint, request, jsonify
from Models import db, Comment, Follower, Like, Post
from datetime import datetime

routes_four = Blueprint('routes_four', __name__)

# -------------------------
# COMMENT CRUD
# -------------------------

@routes_four.route('/comments', methods=['POST'])
def create_comment():
    data = request.get_json()
    required_fields = ['post_id', 'user_id', 'content']
    missing = [f for f in required_fields if f not in data]
    if missing:
        return jsonify({'error': f'Missing fields: {", ".join(missing)}'}), 400

    comment = Comment(
        post_id=data['post_id'],
        user_id=data['user_id'],
        content=data['content'],

    )
    db.session.add(comment)
    db.session.commit()
    return jsonify({'message': 'Comment created', 'comment_id': comment.id}), 201

@routes_four.route('/comments', methods=['GET'])
def get_comments():
    comments = Comment.query.all()
    result = [{
        'id': c.id,
        'post_id': c.post_id,
        'user_id': c.user_id,
        'content': c.content,
        'created_at': c.created_at.isoformat()
    } for c in comments]
    return jsonify(result)

@routes_four.route('/comments/<int:id>', methods=['PUT'])
def update_comment(id):
    comment = Comment.query.get(id)
    if not comment:
        return jsonify({'error': 'Comment not found'}), 404

    data = request.get_json()
    if 'content' in data:
        comment.content = data['content']

    db.session.commit()
    return jsonify({'message': 'Comment updated'})

@routes_four.route('/comments/<int:id>', methods=['DELETE'])
def delete_comment(id):
    comment = Comment.query.get(id)
    if not comment:
        return jsonify({'error': 'Comment not found'}), 404

    db.session.delete(comment)
    db.session.commit()
    return jsonify({'message': 'Comment deleted'})


# -------------------------
# FOLLOWER CRUD
# -------------------------

@routes_four.route('/followers', methods=['POST'])
def create_follower():
    data = request.get_json()
    required_fields = ['user_id', 'follower_id']
    missing = [f for f in required_fields if f not in data]
    if missing:
        return jsonify({'error': f'Missing fields: {", ".join(missing)}'}), 400

    follower = Follower(
        user_id=data['user_id'],
        follower_id=data['follower_id'],
        followed_at=datetime.utcnow()
    )
    db.session.add(follower)
    db.session.commit()
    return jsonify({'message': 'Follower added', 'follower_id': follower.id}), 201

@routes_four.route('/followers', methods=['GET'])
def get_followers():
    followers = Follower.query.all()
    result = [{
        'id': f.id,
        'user_id': f.user_id,
        'follower_id': f.follower_id,
        'followed_at': f.followed_at.isoformat()
    } for f in followers]
    return jsonify(result)

@routes_four.route('/followers/<int:id>', methods=['DELETE'])
def delete_follower(id):
    follower = Follower.query.get(id)
    if not follower:
        return jsonify({'error': 'Follower not found'}), 404

    db.session.delete(follower)
    db.session.commit()
    return jsonify({'message': 'Follower deleted'})


# -------------------------
# LIKE CRUD
# -------------------------

@routes_four.route('/likes', methods=['POST'])
def create_like():
    data = request.get_json()
    required_fields = ['user_id', 'post_id']
    missing = [f for f in required_fields if f not in data]
    if missing:
        return jsonify({'error': f'Missing fields: {", ".join(missing)}'}), 400

    like = Like(
        user_id=data['user_id'],
        post_id=data['post_id'],
        liked_at=datetime.utcnow()
    )
    db.session.add(like)
    db.session.commit()
    return jsonify({'message': 'Like created', 'like_id': like.id}), 201

@routes_four.route('/likes', methods=['GET'])
def get_likes():
    likes = Like.query.all()
    result = [{
        'id': l.id,
        'user_id': l.user_id,
        'post_id': l.post_id,
        'liked_at': l.liked_at.isoformat()
    } for l in likes]
    return jsonify(result)

@routes_four.route('/likes/<int:id>', methods=['DELETE'])
def delete_like(id):
    like = Like.query.get(id)
    if not like:
        return jsonify({'error': 'Like not found'}), 404

    db.session.delete(like)
    db.session.commit()
    return jsonify({'message': 'Like deleted'})


# -------------------------
# POST CRUD
# -------------------------

@routes_four.route('/posts', methods=['POST'])
def create_post():
    data = request.get_json()
    required_fields = ['user_id', 'content']
    missing = [f for f in required_fields if f not in data]
    if missing:
        return jsonify({'error': f'Missing fields: {", ".join(missing)}'}), 400

    post = Post(
        user_id=data['user_id'],
        content=data['content'],
        created_at=datetime.utcnow()
    )
    db.session.add(post)
    db.session.commit()
    return jsonify({'message': 'Post created', 'post_id': post.id}), 201

@routes_four.route('/posts', methods=['GET'])
def get_posts():
    posts = Post.query.all()
    result = [{
        'id': p.id,
        'user_id': p.user_id,
        'content': p.content,
        'created_at': p.created_at.isoformat()
    } for p in posts]
    return jsonify(result)

@routes_four.route('/posts/<int:id>', methods=['PUT'])
def update_post(id):
    post = Post.query.get(id)
    if not post:
        return jsonify({'error': 'Post not found'}), 404

    data = request.get_json()
    if not data or 'content' not in data:
        return jsonify({'error': 'No content provided for update'}), 400

    post.content = data['content']
    db.session.commit()
    return jsonify({'message': 'Post updated successfully', 'post': {
        'post_id': post.post_id,
        'content': post.content,
        'post_date': post.post_date.isoformat(),
        'user_id': post.user_id
    }})

@routes_four.route('/posts/<int:id>', methods=['DELETE'])
def delete_post(id):
    post = Post.query.get(id)
    if not post:
        return jsonify({'error': 'Post not found'}), 404

    db.session.delete(post)
    db.session.commit()
    return jsonify({'message': 'Post deleted successfully'})