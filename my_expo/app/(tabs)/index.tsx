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
  TouchableOpacity,
} from "react-native";
import { Feather } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import styles from "../../components/HomeScreen.styles";
import { dummyUsers } from "../../data/dummyUsers"; // ✅ Import dummy accounts

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
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    if (!agreed) {
      Alert.alert("Policy Required", "You must agree to the policy to proceed.");
      return;
    }
  
    const matchedUser = dummyUsers.find(
      (u) => u.email === email && u.password === password
    );
  
    if (matchedUser) {
      Alert.alert("Login Successful", `Welcome, ${matchedUser.username}!`);
      router.replace({
        pathname: "/(tabs)/DashboardScreen",
        params: {
          name: matchedUser.name,
          username: matchedUser.username,
        },
      });
    } else {
      Alert.alert("Login Failed", "Incorrect email or password.");
    }
  };
  

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.logoContainer}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={[styles.reactLogo, { width: 180, height: 180 }]}
        />
      </ThemedView>

      <ThemedView style={[styles.loginContainer, { marginTop: 60 }]}>
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

          {/* Password Field with Toggle */}
          <View style={localStyles.passwordContainer}>
            <TextInput
              placeholder="Password"
              secureTextEntry={!showPassword}
              style={localStyles.passwordInput}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Feather
                name={showPassword ? "eye" : "eye-off"}
                size={22}
                color="#aa4a44"
              />
            </TouchableOpacity>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity
            onPress={() => router.push("/ForgotPasswordScreen")}
            style={{ alignSelf: "flex-end", marginBottom: 12 }}
          >
            <Text style={{ color: "#aa4a44", fontSize: 13 }}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Agreement Checkbox */}
          <TouchableOpacity
            onPress={() => setAgreed(!agreed)}
            style={localStyles.checkboxContainer}
          >
            <View style={[localStyles.checkbox, agreed && localStyles.checkboxChecked]}>
              {agreed && <Text style={localStyles.checkmark}>✔</Text>}
            </View>
            <Text style={localStyles.checkboxText}>I agree to the policy</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <View style={styles.buttonContainer}>
            <Button
              title="Log In"
              onPress={handleLogin}
              color="#aa4a44"
              disabled={!agreed}
            />
          </View>

          {/* Sign Up Option */}
          <View style={localStyles.signupContainer}>
            <Text style={{ color: "#555" }}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => router.push("/")}>
              <Text style={{ color: "#aa4a44", marginLeft: 6 }}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

// ✨ Local Styles
const localStyles = StyleSheet.create({
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  passwordInput: {
    flex: 1,
    height: 45,
    paddingVertical: 10,
    paddingHorizontal: 8,
    color: "#333",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: "#777",
    marginRight: 8,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#aa4a44",
    borderColor: "#aa4a44",
  },
  checkmark: {
    color: "white",
    fontSize: 14,
  },
  checkboxText: {
    fontSize: 14,
    color: "#333",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
});
