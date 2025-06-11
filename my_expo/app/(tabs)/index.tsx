import { Image } from 'expo-image';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router'; // ✅ Import navigation
import { initialUser } from '@/utils/userData';


function ParallaxScrollView({ children }: { children: React.ReactNode }) {
  return <ScrollView style={styles.scrollView}>{children}</ScrollView>;
}

function ThemedText({ children, type = 'default' }: { children: React.ReactNode; type?: 'title' | 'default' }) {
  return (
    <Text style={type === 'title' ? styles.titleText : styles.defaultText}>
      {children}
    </Text>
  );
}

function ThemedView({ children, style }: { children: React.ReactNode; style?: any }) {
  return <View style={style}>{children}</View>;
}


export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // ✅ Hook for navigation

  const handleLogin = () => {
    if (email === initialUser.email && password === initialUser.password) {
      Alert.alert('Login Successful', 'Welcome!');
      router.push('/DashboardScreen'); // ✅ for Expo Router
 // ✅ Navigate to Dashboard
    } else {
      Alert.alert('Login Failed', 'Incorrect email or password.');
    }
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

        <View style={styles.formBox}>
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          <View style={styles.buttonContainer}>
            <Button title="Log In" onPress={handleLogin} />
          </View>
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}



const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  reactLogo: {
    height: 178,
    width: 290,
    resizeMode: 'contain',
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    width: '100%',
  },
  formBox: {
    maxWidth: 360,
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
  buttonContainer: {
    marginTop: 16,
    width: '100%',
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
