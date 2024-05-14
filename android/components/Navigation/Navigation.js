import { StyleSheet, Text, View } from "react-native";
import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Forms/Login";
import Register from "../Forms/Register";
import { NavigationContainer } from "@react-navigation/native";
import Dashboard from "../Pages/Dashboard";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Projects from "../Pages/Projects";
import Tasks from "../Pages/Tasks";
import Groups from "../Pages/Groups";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const BottomTabsNavigator = ({ navigation }) => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerRight: () => (
            <FontAwesome
              name="user"
              size={24}
              color="black"
              style={{ marginRight: 20 }}
              onPress={() => navigation.navigate("Login")}
            />
          ),
          tabBarIcon: () => (
            <MaterialIcons name="dashboard" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Projects"
        component={Projects}
        options={{
          headerRight: () => (
            <FontAwesome
              name="user"
              size={24}
              color="black"
              style={{ marginRight: 20 }}
              onPress={() => navigation.navigate("Login")}
            />
          ),
          tabBarIcon: () => (
            <MaterialIcons name="featured-play-list" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={Tasks}
        options={{
          headerRight: () => (
            <FontAwesome
              name="user"
              size={24}
              color="black"
              style={{ marginRight: 20 }}
              onPress={() => navigation.navigate("Login")}
            />
          ),
          tabBarIcon: () => (
            <FontAwesome name="list-alt" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Groups"
        component={Groups}
        options={{
          headerRight: () => (
            <FontAwesome
              name="user"
              size={24}
              color="black"
              style={{ marginRight: 20 }}
              onPress={() => navigation.navigate("Login")}
            />
          ),
          tabBarIcon: () => (
            <FontAwesome name="group" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const Navigation = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={BottomTabsNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
