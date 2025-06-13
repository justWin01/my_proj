// Import core React and React Native hooks/components
import React, { useState, useRef } from 'react';
import { BlurView } from 'expo-blur'; // (Optional) Import for background blur effect

import {
  SafeAreaView, KeyboardAvoidingView, Platform, ScrollView,
  View, Text, TextInput, Button, Alert, FlatList, Image, Animated,
  TouchableWithoutFeedback, TouchableOpacity
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import styles from '../../components/DashboardScreenStyles';

export default function DashboardScreen() {
  // Toggles the visibility of the post input area
  const [showPostInput, setShowPostInput] = useState(false);

  // States to store new post's title and content
  const [newPost, setNewPost] = useState('');
  const [newTitle, setNewTitle] = useState('');

  // Sample post list; will grow as user posts
  const [posts, setPosts] = useState([
    {
      title: 'My First Post',
      content: 'This is my first post!',
      likes: 12,
      hearts: 50,
      dislikes: 0,
      comments: 12,
      liked: false,
      hearted: false,
      disliked: false,
      showCommentInput: false,
      date: new Date().toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    },
  ]);

  // Used for animating heart scale effect
  const animations = useRef<Animated.Value[]>([]).current;

  const router = useRouter();

  // Handles creating and saving a new post
  const handlePost = () => {
    if (newPost.trim() !== '') {
      const currentDate = new Date().toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });

      setPosts([
        {
          title: newTitle,
          content: newPost,
          likes: 0,
          hearts: 0,
          dislikes: 0,
          comments: 0,
          liked: false,
          hearted: false,
          disliked: false,
          showCommentInput: false,
          date: currentDate,
        },
        ...posts,
      ]);
      animations.unshift(new Animated.Value(1)); // Add animation for heart
      setNewPost('');
      setNewTitle('');
      Alert.alert('Post Saved', 'Your post has been added.');
    } else {
      Alert.alert('Empty Post', 'Please write something before posting.');
    }
  };

  // Like/heart/dislike toggles and comment interaction
  const toggleHeart = (index: number) => {
    const newPosts = [...posts];
    const post = newPosts[index];
    post.hearted = !post.hearted;
    post.hearts += post.hearted ? 1 : -1;
    setPosts(newPosts);

    // Animate the heart icon
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

  const toggleCommentInput = (index: number) => {
    const newPosts = [...posts];
    newPosts[index].showCommentInput = !newPosts[index].showCommentInput;
    setPosts(newPosts);
  };

  // Post rendering block
  const renderPost = ({ item, index }: { item: any; index: number }) => {
    if (!animations[index]) animations[index] = new Animated.Value(1);

    return (
      <View style={styles.postContainer}>
        {/* User Info */}
        <View style={styles.postHeader}>
          <Image source={require('@/assets/images/unknown.png')} style={styles.postAvatar} />
          <Text style={styles.postUsername}>Sherwin Labe</Text>
        </View>

        {/* Title & Content */}
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postContent}>{item.content}</Text>

        {/* Comment toggle */}
        <Button
          title={item.showCommentInput ? 'Hide Comments' : 'Comment'}
          onPress={() => toggleCommentInput(index)}
          color="#333"
        />

        {/* Comment box */}
        {item.showCommentInput && (
          <TextInput
            style={styles.commentInput}
            placeholder="Write a comment..."
            onFocus={() => handleCommentFocus(index)}
          />
        )}

        {/* Action buttons */}
        <View style={styles.actionsRow}>
          <Button
            title="👍"
            onPress={() => toggleLike(index)}
            color={item.liked ? '#228B22' : '#808080'}
          />
          <Button
            title="👎"
            onPress={() => toggleDislike(index)}
            color={item.disliked ? '#B22222' : '#808080'}
          />
          <TouchableWithoutFeedback onPress={() => toggleHeart(index)}>
            <Animated.View style={{ transform: [{ scale: animations[index] }], marginLeft: 12 }}>
              <AntDesign
                name={item.hearted ? 'heart' : 'hearto'}
                size={26}
                color={item.hearted ? 'red' : ''}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>

        {/* Post stats and date */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 13, color: '#333', marginRight: 8 }}>👍 {item.likes}</Text>
            <Text style={{ fontSize: 13, color: '#333', marginRight: 8 }}>❤️ {item.hearts}</Text>
            <Text style={{ fontSize: 13, color: '#333', marginRight: 8 }}>👎 {item.dislikes}</Text>
            <Text style={{ fontSize: 13, color: '#333' }}>💬 {item.comments}</Text>
          </View>
          <Text style={{ fontSize: 12, color: '#888' }}>{item.date}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(128, 0, 0, 0.5)' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'android' ? 20 : 40}
      >
        <View style={{ flex: 1 }}>
          {/* Header: user info, search, notification */}
          <View style={styles.header}>
            <View style={styles.userInfo}>
              <Image source={require('@/assets/images/unknown.png')} style={styles.avatar} />
              <View>
                <Text style={styles.username}>Sherwin Labe</Text>
                <Text style={styles.userHandle}>@sherwin_labe01</Text>
              </View>
            </View>

            {/* Search bar and notification */}
            <View style={styles.searchNotifWrapper}>
              <View style={styles.searchSection}>
                <TextInput
                  placeholder="Search"
                  placeholderTextColor="#ccc"
                  style={styles.searchInput}
                />
                <AntDesign name="search1" size={20} color="white" />
              </View>
              <TouchableWithoutFeedback onPress={() => Alert.alert('Notifications')}>
                <View style={styles.notifIcon}>
                  <AntDesign name="bells" size={22} color="white" />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>

          {/* Feed list */}
          <FlatList
            data={posts}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => renderPost({ item, index })}
            contentContainerStyle={{ paddingBottom: 120 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={true}
          />
        </View>

        {/* Button to show/hide post input */}
        <TouchableOpacity
          onPress={() => setShowPostInput(prev => !prev)}
          style={styles.togglePostButton}
        >
          <Text style={styles.togglePostButtonText}>{showPostInput ? '→' : '📝'}</Text>
        </TouchableOpacity>

        {/* Floating logout menu */}
        <View style={styles.floatingMenu}>
          <TouchableWithoutFeedback
            onPress={() => {
              Alert.alert('Logged out', 'You have been logged out.');
              router.replace('/');
            }}
          >
            <View style={styles.menuItem}>
              <AntDesign name="logout" size={20} color="white" />
              <Text style={styles.menuText}>Logout</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        {/* Floating input to add post */}
        {showPostInput && (
          <View style={styles.floatingPostInput}>
            <TextInput
              style={styles.floatingTitleInput}
              placeholder=""
              placeholderTextColor="#ccc"
              value={newTitle}
              onChangeText={setNewTitle}
            />
            <TextInput
              style={styles.floatingPostInputBox}
              placeholder="What's on your mind?..."
              placeholderTextColor="#ccc"
              value={newPost}
              onChangeText={setNewPost}
              multiline
            />
            <TouchableOpacity onPress={handlePost} style={styles.floatingPostButton}>
              <Text style={styles.floatingPostButtonText}>➤</Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
