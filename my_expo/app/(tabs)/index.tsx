import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, ScrollView, Alert } from 'react-native';

// 👇 Replacing ParallaxScrollView
function ParallaxScrollView({ children }: { children: React.ReactNode }) {
  return <ScrollView style={styles.scrollView}>{children}</ScrollView>;
}

// 👇 Replacing ThemedText
function ThemedText({ children, type = 'default' }: { children: React.ReactNode; type?: 'title' | 'default' }) {
  return (
    <Text style={type === 'title' ? styles.titleText : styles.defaultText}>
      {children}
    </Text>
  );
}

// 👇 Replacing ThemedView
function ThemedView({ children, style }: { children: React.ReactNode; style?: any }) {
  return <View style={style}>{children}</View>;
}

// 👇 HomeScreen component
export default function HomeScreen() {
  const handleLogin = () => {
    Alert.alert('Login pressed');
  };

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.reactLogo}
        />
      </ThemedView>

      <ThemedView style={styles.loginContainer}>
        <ThemedText type="title">Log In</ThemedText>

        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
        />

        <View style={styles.buttonContainer}>
          <Button title="Log In" onPress={handleLogin} />
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#A1CEDC',
  },
  reactLogo: {
    height: 178,
    width: 290,
    resizeMode: 'contain',
  },
  loginContainer: {
    padding: 20,
    gap: 16,
    alignItems: 'center',
  },
  formBox: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginTop: 16,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  defaultText: {
    fontSize: 16,
  },
});
