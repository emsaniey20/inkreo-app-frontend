import { useRouter } from 'expo-router';
import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Keyboard,
  TouchableWithoutFeedback, ActivityIndicator, Image, Dimensions, ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; 

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

const { height } = Dimensions.get('window');

const LoginScreen = ({ navigation, onLoginSuccess, onRegister }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const getMarginForScreenSize = () => (height < 600 ? "81%" : height < 900 ? 50 : 100);
  const getPaddingForScreenSize = () => (height < 600 ? "81%" : height < 900 ? 120 : 0);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://your-api.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        Alert.alert("Success", "Login successful!");
        router.push("/"); 
      } else {
        Alert.alert("Error", data.message || "Invalid credentials.");
      }
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.scrollView}>
          <Image source={require("../../assets/images/wave.png")} style={styles.topImage} />
          <Image source={require("../../assets/images/logo-auth_sign-in.png")} style={styles.logo} />

          <Text style={styles.title}>Sign In To Inkreo</Text>

          <View style={styles.formContainer}>
            <Text style={styles.formplaceholder}>Email Address</Text>
            <View style={styles.inputContainer}>
              <Image source={require("../../assets/images/mail.png")} style={styles.inputIcon} />
              <Image source={require("../../assets/images/Line.png")} style={styles.inputIcon1} />
              <TextInput
                style={[styles.input, { color: '#FFFFFF' }]}
                placeholder="you@example.com"
                placeholderTextColor="#FFFFFF66"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <Text style={styles.formplaceholder}>Password</Text>
            <View style={styles.inputContainer}>
              <Image source={require("../../assets/images/lock.png")} style={styles.inputIcon3} />
              <Image source={require("../../assets/images/Line.png")} style={styles.inputIcon1} />
              <TextInput
                style={[styles.passwordInput, { color: '#FFFFFF' }]}
                placeholder="Fill in your Password"
                placeholderTextColor="#FFFFFF66"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
              />
              <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                <Icon name={isPasswordVisible ? "eye-off" : "eye"} size={24} color="#FFFFFF66" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
              <Text style={styles.forgotPassword}>Forgot Password</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.loginText}>Sign In</Text>}
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>Or</Text>
              <View style={styles.line} />
            </View>

            <TouchableOpacity style={styles.loginWithGoogleButton} onPress={onLoginSuccess} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <View style={styles.buttonContent}>
                  <Image source={require('../../assets/images/devicon_google.png')} style={styles.buttonIcon2} />
                  <Text style={styles.loginText}>Continue with Google</Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/auth/register_screen')}>
              <Text style={[styles.signUpText, { marginTop: getMarginForScreenSize(), paddingBottom: getPaddingForScreenSize() }]}>
                Don’t have an account? <Text style={styles.signUpLink}>Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </View>

          <Image source={require("../../assets/images/wave2.png")} style={styles.bottomImage} />
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5924AA",
    justifyContent: "space-between",
  },
  topImage: {
    width: "100%",
    height: 65.36,
    top: -1,
    left: 3,
    border: 1,

    resizeMode: "cover",
    position: "absolute",
    top: 0,
  },
  logo: {
    width: 107.77, // Adjust width
    height: 102.21, // Adjust height
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 77.94, // Position 77px from the top
  },

  bottomImage: {
    width: "100%",
    height: 103.3,
    left: -1,

    resizeMode: "cover",
    position: "absolute",
    bottom: 0,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    width: 263,
    height: 38,
    color: "#FFFFFF",
    marginTop: 20,
    textAlign: "center", // Centers the text inside the container
    alignSelf: "center",
  },

  formContainer: { flex: 1, justifyContent: "flex-start", paddingHorizontal: 20, marginTop: 30, },
  formplaceholder: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFFFFF",
    marginTop: 20,
    textAlign: "left",

  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#FFFFFF66",
    borderWidth: 1,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#00000030",
  },
  inputIcon: {
    width: 20, // Adjust icon size
    height: 16,
    marginRight: 10, // Spacing between icon and input
    tintColor: "#FFFFFF66",
  },
  inputIcon3: {
    width: 20, // Adjust icon size
    height: 25,
    marginRight: 10, // Spacing between icon and input
    tintColor: "#FFFFFF66",
  },
  inputIcon1: {
    width: 2,
    height: 30,
    marginRight: 10, // Spacing between icon and input
    tintColor: "#FFFFFF66",
  },
  passwordInput: {
    flex: 1,
    height: 50,
    fontSize: 14,
  },
  input: {
    flex: 1, borderColor: "#FFFFFF66",
    fontSize: 12, fontWeight: "500",
  },
  passwordContainer: {
    flexDirection: "row", alignItems: "center", borderColor: "#FFFFFF66", borderWidth: 1,
    borderRadius: 10, paddingHorizontal: 15, backgroundColor: "#783CC8",
  },
  passwordInput: { flex: 1, height: 50, fontSize: 14, },
  forgotPassword: { color: "#E94560", textAlign: "right", marginTop: 10, fontSize: 14, fontWeight: "500", },
  loginButton: {
    backgroundColor: "#E94560", paddingVertical: 15, borderRadius: 10,
    alignItems: "center", marginTop: 20,
  },
  loginText: { color: "#FFF", fontSize: 16, fontWeight: "800" },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#FFFFFF",
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "700",

  },
  loginWithGoogleButton: {
    backgroundColor: "#000000",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon2: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  signUpText: { textAlign: "center", color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  signUpLink: { color: "#E63946", fontWeight: "bold" },
});

export default LoginScreen;
