import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  FlatList,
  Image,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import styles from '../../components/DashboardScreenStyles';

export default function DashboardScreen() {
  const [showPostInput, setShowPostInput] = useState(false);
  const [newPost, setNewPost] = useState('');
  const [newTitle, setNewTitle] = useState('');

  const [posts, setPosts] = useState([
    {
      title: 'My First Post',
      content: 'This is my first post!',
      likes: 12,
      hearts: 50,
      dislikes: 0,
      comments: 1,
      liked: false,
      hearted: false,
      disliked: false,
      showCommentInput: false,
      newComment: '',
      commentList: [
        {
          id: 1,
          name: 'Sherwin Labe',
          avatar: require('@/assets/images/unknown.png'),
          text: 'Welcome! 🎉',
          timestamp: new Date(),
        },
      ],
      date: new Date().toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    },
  ]);

  const animations = useRef<Animated.Value[]>([]).current;
  const router = useRouter();

  const handlePost = () => {
    if (newPost.trim() === '') {
      return Alert.alert('Empty Post', 'Please write something before posting.');
    }

    const currentDate = new Date().toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    const newPostObj = {
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
      newComment: '',
      commentList: [],
      date: currentDate,
    };

    setPosts([newPostObj, ...posts]);
    animations.unshift(new Animated.Value(1));
    setNewPost('');
    setNewTitle('');
    Alert.alert('Post Saved', 'Your post has been added.');
  };

  const toggleLike = (index: number) => {
    const updatedPosts = [...posts];
    const post = updatedPosts[index];
  
    if (!post.liked) {
      post.liked = true;
      post.likes += 1;
  
      if (post.disliked) {
        post.disliked = false;
        post.dislikes -= 1;
      }
      if (post.hearted) {
        post.hearted = false;
        post.hearts -= 1;
      }
    } else {
      post.liked = false;
      post.likes -= 1;
    }
  
    setPosts(updatedPosts);
  };
  
  const toggleDislike = (index: number) => {
    const updatedPosts = [...posts];
    const post = updatedPosts[index];
  
    if (!post.disliked) {
      post.disliked = true;
      post.dislikes += 1;
  
      if (post.liked) {
        post.liked = false;
        post.likes -= 1;
      }
      if (post.hearted) {
        post.hearted = false;
        post.hearts -= 1;
      }
    } else {
      post.disliked = false;
      post.dislikes -= 1;
    }
  
    setPosts(updatedPosts);
  };
  
  const toggleHeart = (index: number) => {
    const updatedPosts = [...posts];
    const post = updatedPosts[index];
  
    if (!post.hearted) {
      post.hearted = true;
      post.hearts += 1;
  
      if (post.liked) {
        post.liked = false;
        post.likes -= 1;
      }
      if (post.disliked) {
        post.disliked = false;
        post.dislikes -= 1;
      }
    } else {
      post.hearted = false;
      post.hearts -= 1;
    }
  
    setPosts(updatedPosts);
  
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
  
  const toggleCommentInput = (index: number) => {
    const updatedPosts = [...posts];
    updatedPosts[index].showCommentInput = !updatedPosts[index].showCommentInput;
    setPosts(updatedPosts);
  };

  const renderPost = ({ item, index }: { item: any; index: number }) => {
    if (!animations[index]) animations[index] = new Animated.Value(1);

    return (
      <View style={styles.postContainer}>
        <View style={styles.postHeader}>
          <Image source={require('@/assets/images/unknown.png')} style={styles.postAvatar} />
          <Text style={styles.postUsername}>Sherwin Labe</Text>
        </View>

        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postContent}>{item.content}</Text>

        <TouchableOpacity
          onPress={() => toggleCommentInput(index)}
          style={{
            marginTop: 10,
            padding: 8,
            backgroundColor: '#f2f2f2',
            borderRadius: 6,
            alignSelf: 'flex-start',
          }}
        >
          <Text style={{ color: '#333' }}>
            {item.showCommentInput ? 'Hide Comments' : '💬 Comment'}
          </Text>
        </TouchableOpacity>

        {item.showCommentInput && (
          <View style={{ marginTop: 10 }}>
            <TextInput
              style={styles.commentInput}
              placeholder="Write a comment..."
              placeholderTextColor="#888"
              value={item.newComment}
              onChangeText={(text) => {
                const updated = [...posts];
                updated[index].newComment = text;
                setPosts(updated);
              }}
              onSubmitEditing={() => {
                if ((item.newComment || '').trim()) {
                  const updated = [...posts];
                  const commentText = updated[index].newComment.trim();
                  updated[index].commentList.unshift({
                    id: Date.now(),
                    name: 'Sherwin Labe',
                    avatar: require('@/assets/images/unknown.png'),
                    text: commentText,
                    timestamp: new Date(),
                  });
                  updated[index].newComment = '';
                  updated[index].comments = updated[index].commentList.length;
                  setPosts(updated);
                }
              }}
            />

            {item.commentList?.length > 0 && (
              <View style={{ marginTop: 10 }}>
                {item.commentList.map((comment: any) => (
                  <View key={comment.id} style={{ flexDirection: 'row', marginVertical: 5 }}>
                    <Image
                      source={comment.avatar}
                      style={{ width: 30, height: 30, borderRadius: 15, marginRight: 8 }}
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 13 }}>{comment.name}</Text>
                      <Text style={{ fontSize: 13 }}>{comment.text}</Text>
                      <Text style={{ fontSize: 11, color: '#999' }}>
                        {comment.timestamp.toLocaleTimeString()}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

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
            <Animated.View
              style={{ transform: [{ scale: animations[index] }], marginLeft: 12 }}
            >
              <AntDesign
                name={item.hearted ? 'heart' : 'hearto'}
                size={26}
                color={item.hearted ? 'red' : ''}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>

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
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.userInfo}>
              <Image source={require('@/assets/images/unknown.png')} style={styles.avatar} />
              <View>
                <Text style={styles.username}>Sherwin Labe</Text>
                <Text style={styles.userHandle}>@sherwin_labe01</Text>
              </View>
            </View>

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

          <FlatList
            data={posts}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderPost}
            contentContainerStyle={{ paddingBottom: 120 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator
          />
        </View>

        {/* Post Toggle Button */}
        <TouchableOpacity
          onPress={() => setShowPostInput(prev => !prev)}
          style={styles.togglePostButton}
        >
          <Text style={styles.togglePostButtonText}>{showPostInput ? '→' : '📝'}</Text>
        </TouchableOpacity>

        {/* Logout Floating Menu */}
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

        {/* Floating Post Input */}
        {showPostInput && (
          <View style={styles.floatingPostInput}>
            <TextInput
              style={styles.floatingTitleInput}
              placeholder="Title"
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
