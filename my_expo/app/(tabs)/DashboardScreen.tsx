import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  FlatList,
  Image,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from '../../components/DashboardScreenStyles';

export default function DashboardScreen() {
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState([
    { content: 'This is my first post!', likes: 0, hearts: 0, dislikes: 0, comments: 0, liked: false, hearted: false, disliked: false },
  ]);
  const animations = useRef<Animated.Value[]>([]).current;

  const handlePost = () => {
    if (newPost.trim() !== '') {
      setPosts([
        {
          content: newPost,
          likes: 0,
          hearts: 0,
          dislikes: 0,
          comments: 0,
          liked: false,
          hearted: false,
          disliked: false,
        },
        ...posts,
      ]);
      animations.unshift(new Animated.Value(1));
      setNewPost('');
      Alert.alert('Post Saved', 'Your post has been added.');
    } else {
      Alert.alert('Empty Post', 'Please write something before posting.');
    }
  };

  const toggleHeart = (index: number) => {
    const newPosts = [...posts];
    const post = newPosts[index];
    post.hearted = !post.hearted;
    post.hearts += post.hearted ? 1 : -1;
    setPosts(newPosts);

    Animated.sequence([
      Animated.timing(animations[index], {
        toValue: 1.4,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(animations[index], {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const toggleLike = (index: number) => {
    const newPosts = [...posts];
    const post = newPosts[index];
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    setPosts(newPosts);
  };

  const toggleDislike = (index: number) => {
    const newPosts = [...posts];
    const post = newPosts[index];
    post.disliked = !post.disliked;
    post.dislikes += post.disliked ? 1 : -1;
    setPosts(newPosts);
  };

  const handleCommentFocus = (index: number) => {
    const newPosts = [...posts];
    newPosts[index].comments += 1;
    setPosts(newPosts);
  };

  const renderPost = ({ item, index }: { item: any; index: number }) => {
    if (!animations[index]) animations[index] = new Animated.Value(1);
  
    return (
      <View style={styles.postContainer}>
        <Text style={styles.postLabel}>Post</Text>
        <Text style={styles.postContent}>{item.content}</Text>
  
        <TextInput
          style={styles.commentInput}
          placeholder="Write a comment..."
          onFocus={() => handleCommentFocus(index)}
        />
  
        {/* Action Buttons */}
        <View style={styles.actionsRow}>
          <Button
            title="Like"
            onPress={() => toggleLike(index)}
            color={item.liked ? '#228B22' : '#808080'}
          />
  
          <Button
            title="Dislike"
            onPress={() => toggleDislike(index)}
            color={item.disliked ? '#B22222' : '#808080'}
          />
  
          <TouchableWithoutFeedback onPress={() => toggleHeart(index)}>
            <Animated.View style={{ transform: [{ scale: animations[index] }], marginLeft: 12 }}>
              <AntDesign
                name={item.hearted ? 'heart' : 'hearto'}
                size={26}
                color={item.hearted ? 'red' : 'gray'}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
  
        {/* Separate Count Row */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
          <Text style={{ fontSize: 13, color: '#333' }}>👍 Likes: {item.likes}</Text>
          <Text style={{ fontSize: 13, color: '#333' }}>❤️ Hearts: {item.hearts}</Text>
          <Text style={{ fontSize: 13, color: '#333' }}>👎 Dislikes: {item.dislikes}</Text>
          <Text style={{ fontSize: 13, color: '#333' }}>💬 Comments: {item.comments}</Text>
        </View>
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={{
              uri: 'https://media.istockphoto.com/id/1142192548/vector/man-avatar-profile-male-face-silhouette-or-icon-isolated-on-white-background-vector.jpg',
            }}
            style={styles.avatar}
          />
          <Text style={styles.username}>John Doe</Text>
        </View>
      </View>

      <View style={styles.postInputContainer}>
        <TextInput
          style={styles.newPostInput}
          placeholder="Write your post here..."
          value={newPost}
          onChangeText={setNewPost}
          multiline
        />
        <Button title="Post" onPress={handlePost} />
      </View>

      <FlatList
        data={posts}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => renderPost({ item, index })}
        contentContainerStyle={styles.mainContent}
      />
    </View>
  );
}
