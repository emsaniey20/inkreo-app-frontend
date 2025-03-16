import React, { useState, } from "react";
import {  useRouter, } from "expo-router";
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Keyboard, 
  TouchableWithoutFeedback, ActivityIndicator, Image 
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Use vector icons

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);


const RegisterScreen = ({ navigation, onLogin }) => {
    const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://your-api.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });
      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        Alert.alert("Success", "Registration successful!");
        navigation.replace("HomeScreen");
      } else {
        Alert.alert("Error", data.message || "Registration failed.");
      }
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image source={require("../../assets/images/wave.png")} style={styles.topImage} />
        <View style={styles.headerContainer}>
  {/* Back Button */}
  <TouchableOpacity onPress={onLogin} style={styles.ellipseWrapper}>
    <Image source={require("../../assets/images/Ellipse.png")} style={styles.ellipse} />
    <Image source={require("../../assets/images/arrow_back.png")} style={styles.arrowIcon} />
  </TouchableOpacity>

  {/* Logo */}
  <Image source={require("../../assets/images/logo-auth_sign-in.png")} style={styles.logo} />
</View>


<View style={styles.textContainer}>
    <Text style={styles.title}>Create Your Account</Text>
    <Text style={styles.description}>
      Join Inkreo for a seamless, personalized experience. Get started by filling in your details below.
    </Text>
  </View>

        <View style={styles.formContainer}>
          <Text style={styles.formplaceholder}>Full Name</Text>
          <View style={styles.inputContainer}>
          <Image source={require("../../assets/images/account_box.png")} style={styles.inputIcon2} />
          <Image source={require("../../assets/images/Line.png")} style={styles.inputIcon1} />
            <TextInput
              style={[styles.input, { color: '#FFFFFF' }]}
              placeholder="Enter your full name"
              autoComplete="name" // For full name
  textContentType="name"
              placeholderTextColor="#FFFFFF66"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>
          
          <Text style={styles.formplaceholder}>Email Address</Text>
          <View style={styles.inputContainer}>
            <Image source={require("../../assets/images/mail.png")} style={styles.inputIcon3} />
              <Image source={require("../../assets/images/Line.png")} style={styles.inputIcon1} />
            <TextInput
              style={[styles.input, { color: '#FFFFFF' }]}
              placeholder="you@example.com"
              placeholderTextColor="#FFFFFF66"
              value={email}
              autoComplete="email" // For email
  textContentType="emailAddress"
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <Text style={styles.formplaceholder}>Password</Text>
          <View style={styles.inputContainer}>
            <Image source={require("../../assets/images/lock.png")} style={styles.inputIcon} />
            <Image source={require("../../assets/images/Line.png")} style={styles.inputIcon1} />
            <TextInput
              style={[styles.passwordInput, { color: '#FFFFFF' }]}
              placeholder="Fill in your Password"
              placeholderTextColor="#FFFFFF66"
              value={password}
              autoComplete="password" // For password
  textContentType="newPassword"
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
              <Icon 
                name={isPasswordVisible ? "eye-off" : "eye"} 
                size={24} 
                color="#FFFFFF66" 
              />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.formplaceholder}>Confirm Password</Text>
          <View style={styles.inputContainer}>
          <Image source={require("../../assets/images/lock.png")} style={styles.inputIcon2} />
          <Image source={require("../../assets/images/Line.png")} style={styles.inputIcon1} />
            <TextInput
              style={[styles.passwordInput, { color: '#FFFFFF' }]}
              placeholder="Re-type your password"
              placeholderTextColor="#FFFFFF66"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              autoComplete="password" // For password
  textContentType="newPassword"
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
              <Icon 
                name={isPasswordVisible ? "eye-off" : "eye"} 
                size={24} 
                color="#FFFFFF66" 
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={loading}>
            {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.registerText}>Sign Up</Text>}
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
                  <View style={styles.line} />
                  <Text style={styles.dividerText}>Or</Text>
                  <View style={styles.line} />
                </View>
                <TouchableOpacity style={styles.loginWithGoogleButton} onPress={handleRegister} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <View style={styles.buttonContent}>
                <Image
                  source={require('../../assets/images/devicon_google.png')}
                  style={styles.buttonIcon2}
                />
                <Text style={styles.loginText}>Continue with Google</Text>
              </View>
               )}
               
              </TouchableOpacity>
              <TouchableOpacity onPress={onLogin} >
                           <Text style={styles.signUpText}>
                           Already have an account?
 
                             <Text style={styles.signUpLink}> Log In</Text>
                           </Text>
                         </TouchableOpacity>
                         
        </View>
        <Image source={require("../../assets/images/wave2.png")} style={styles.bottomImage} />
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
    height: 65,
    position: "absolute",
    top: 0,
  },
  logo: {
    width: 74,
    height: 70,
    resizeMode: "contain",
  },
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between", // Space between back button & logo
      paddingHorizontal: 20, 
      marginTop: 50,
    },
    ellipseWrapper: {
      width: 40,  
      height: 40,  
      justifyContent: "center",
      alignItems: "center",
      position: "relative", // Allows stacking inside
    },
    ellipse: {
      width: 50, // Same as wrapper
      height: 50,
      resizeMode: "contain",
    },
    arrowIcon: {
      width: 25, // Adjust arrow size
      height: 25,
      position: "absolute", // Centers it inside the ellipse
    },
  
  title: { 
    fontSize: 32, 
    fontWeight: "700", 
    color: "#FFFFFF", 
    textAlign: "center",
  },
  description: { 
    fontSize: 12, 
    fontWeight: "400", 
    color: "#FFFFFF", 
    textAlign: "center",
    marginTop: 10,
  },
  textContainer: {
    alignItems: "center",
    marginTop: 10, // Space below logo
    paddingHorizontal: 50,
  },
  formContainer: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    marginTop: 30,
  },
  formplaceholder: {
    fontSize: 14, 
    fontWeight: "500", 
    color: "#FFFFFF", 
    marginTop: 10, 
    marginBottom: 10,
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
  input: {
    flex: 1,
    fontSize: 14,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    fontSize: 14,
  },
  registerButton: {
    backgroundColor: "#E94560",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  registerText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "800",
  },
  inputIcon: {
    width: 20, // Adjust icon size
    height: 25,
    marginRight: 10, // Spacing between icon and input
    tintColor: "#FFFFFF66",
  },
  inputIcon3: {
    width: 20, // Adjust icon size
    height: 16,
    marginRight: 10, // Spacing between icon and input
    tintColor: "#FFFFFF66",
  },
  inputIcon2: {
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
    marginTop: 5,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    zIndex: 10,
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
  bottomImage: {
    width: "100%",
    height: 103.3,
    left: -1,

    resizeMode: "cover",
    position: "absolute",
    bottom: 0,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  loginText: { color: "#FFF", fontSize: 16, fontWeight: "800" },
  signUpText: { textAlign: "center", color: "#FFFFFF", marginTop: 20, fontSize: 14, fontWeight: "700" },
  signUpLink: { color: "#E63946", fontWeight: "bold" },
});

export default RegisterScreen;