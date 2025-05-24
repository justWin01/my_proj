from flask import Blueprint, request, jsonify
from Models import db, Post
from datetime import datetime

post_routes = Blueprint('post_routes', __name__)  # <-- renamed here

# CREATE a post
@post_routes.route('/', methods=['POST'])
def create_post():
    data = request.get_json()
    new_post = Post(
        content=data.get('content'),
        user_id=data.get('user_id'),
        post_date=datetime.utcnow()
    )
    db.session.add(new_post)
    db.session.commit()
    return jsonify({'message': 'Post created successfully', 'post_id': new_post.post_id}), 201

# READ all posts
@post_routes.route('/posts', methods=['GET'])
def get_all_posts():
    posts = Post.query.all()
    return jsonify([
        {
            'post_id': p.post_id,
            'content': p.content,
            'comment_count': p.comment_count,
            'post_date': p.post_date.strftime('%Y-%m-%d'),
            'user_id': p.user_id
        } for p in posts
    ]), 200

# READ single post
@post_routes.route('/posts/<int:post_id>', methods=['GET'])
def get_post(post_id):
    post = Post.query.get_or_404(post_id)
    return jsonify({
        'post_id': post.post_id,
        'content': post.content,
        'comment_count': post.comment_count,
        'post_date': post.post_date.strftime('%Y-%m-%d'),
        'user_id': post.user_id
    }), 200

# UPDATE post
@post_routes.route('/posts/<int:post_id>', methods=['PUT'])
def update_post(post_id):
    post = Post.query.get_or_404(post_id)
    data = request.get_json()

    post.content = data.get('content', post.content)
    db.session.commit()

    return jsonify({'message': 'Post updated successfully'}), 200

# DELETE post
@post_routes.route('/posts/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()
    return jsonify({'message': 'Post deleted successfully'}), 200
