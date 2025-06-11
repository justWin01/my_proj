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
        {/* 👤 Post Header (User Info) */}
        <View style={styles.postHeader}>
          <Image
            source={require('@/assets/images/unknown.png')}
            style={styles.postAvatar}
          />
          <Text style={styles.postUsername}>Sherwin Labe</Text>
        </View>
  
        <Text style={styles.postLabel}></Text>
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
  
        {/* Count Row */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
          <Text style={{ fontSize: 13, color: '#333' }}>👍  {item.likes}</Text>
          <Text style={{ fontSize: 13, color: '#333' }}>❤️  {item.hearts}</Text>
          <Text style={{ fontSize: 13, color: '#333' }}>👎  {item.dislikes}</Text>
          <Text style={{ fontSize: 13, color: '#333' }}>💬  {item.comments}</Text>
        </View>
      </View>
    );
  };
  
  
  return (
    <View style={styles.container}>
    <View style={styles.header}>
  {/* 👤 User Info (Left) */}
  <View style={styles.userInfo}>
    <Image
      source={require('@/assets/images/unknown.png')}
      style={styles.avatar}
    />
    <View>
      <Text style={styles.username}>Sherwin Labe</Text>
      <Text style={styles.userHandle}>@sherwin_labe01</Text>
    </View>
  </View>

  {/* 🔍 Search Input (Right) */}
  <View style={styles.searchSection}>
    <TextInput
      placeholder="Search"
      placeholderTextColor="#ccc"
      style={styles.searchInput}
    />
    <AntDesign name="search1" size={20} color="white" />
  </View>
</View>

  
  
      {/* Merged Input + Post Button */}
      <View style={styles.postInputContainer}>
        <TextInput
          style={styles.newPostInput}
          placeholder="Write your post here..."
          value={newPost}
          onChangeText={setNewPost}
          multiline
        />
        <View style={styles.postButtonWrapper}>
          <Button title="➤" onPress={handlePost} />
        </View>
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
