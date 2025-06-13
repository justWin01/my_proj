import { Image } from "expo-image";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import styles from "../../components/HomeScreen.styles";

function ParallaxScrollView({ children }: { children: React.ReactNode }) {
  return <ScrollView style={styles.scrollView}>{children}</ScrollView>;
}

function ThemedText({
  children,
  type = "default",
}: {
  children: React.ReactNode;
  type?: "title" | "default";
}) {
  return (
    <Text style={type === "title" ? styles.titleText : styles.defaultText}>
      {children}
    </Text>
  );
}

function ThemedView({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) {
  return <View style={style}>{children}</View>;
}

export default function HomeScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.100.8:5000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Login Successful", `Welcome, ${data.user.full_name}!`);
        router.push("/DashboardScreen");
      } else {
        Alert.alert("Login Failed", data.message || "Incorrect email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Could not connect to the server.");
    }
  };

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.logoContainer}>
        <Image
          source={require("@/assets/images/logo.png")}
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
            <Button title="Log In" onPress={handleLogin} color="#aa4a44" />
          </View>
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}
