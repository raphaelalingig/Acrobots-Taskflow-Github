import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { TextInput, Text, Button } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";

const Login = ({ navigation }) => {
  function LoginNavigate() {
    navigation.navigate("Dashboard");
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundPicture}
        source={require("../../assets/pictures/loginPicture.jpg")}
      />
      <View style={styles.logo}>
        <Image
          style={styles.logoImage}
          source={require("../../assets/pictures/taskflowLogo.png")}
        />
      </View>
      <View style={styles.inputs}>
        <TextInput label="Email: " style={styles.input} />
        <TextInput label="Password: " style={styles.input} secureTextEntry />
        <View
          style={{ backgroundColor: "white", padding: 5, borderRadius: 10 }}
        >
          <Text variant="bodyLarge">
            Dont have an account?{" "}
            <Text
              variant="bodyLarge"
              style={styles.register}
              onPress={() => navigation.navigate("Register")}
            >
              Register here
            </Text>
          </Text>
        </View>
        <View style={styles.loginButton}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Dashboard")}
          >
            <Text style={{ color: "white" }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  logo: {
    position: "absolute",
    zIndex: 1,
  },
  backgroundPicture: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
    zIndex: 0,
  },
  logoImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  inputs: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    gap: 10,
    marginTop: "80%",
  },
  input: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 20,
  },
  loginButton: {
    backgroundColor: "#1a56db",
    marginLeft: "65%",
    padding: 15,
    borderRadius: 10,
  },
  register: {
    color: "blue",
  },
});
