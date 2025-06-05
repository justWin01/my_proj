import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http:// 192.168.100.8:5000/user/login', {
        email,
        password,
      });

      if (response.status === 200) {
        Alert.alert('Login Successful');
        // Navigate to the main screen
        navigation.navigate('Home');
      }
    } catch (error) {
      Alert.alert('Login Failed', error.response?.data?.message || 'Unknown error');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ marginBottom: 10, borderBottomWidth: 1 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 20, borderBottomWidth: 1 }}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
