// app/ForgotPasswordScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email.");
      return;
    }

    try {
      const response = await fetch("http://192.168.100.8:5000/users/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Check your email to reset your password.");
        router.replace("/"); // Back to login
      } else {
        Alert.alert("Failed", data.message || "Email not found.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Could not connect to server.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Button title="Send Reset Link" onPress={handleResetPassword} color="#aa4a44" />

      <TouchableOpacity onPress={() => router.push("/")}>
        <Text style={styles.backText}>← Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 100,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    color: "#aa4a44",
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 45,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  backText: {
    marginTop: 20,
    textAlign: "center",
    color: "#007AFF",
  },
});
