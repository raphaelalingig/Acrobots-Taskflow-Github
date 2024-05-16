import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { Text } from "react-native-paper";

const Dashboard = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.taskContent}>
        <View style={styles.taskStatus}>
          <View style={styles.opentask}>
            <Text>Open Tasks</Text>
            <Text>10</Text>
          </View>
          <View style={styles.closetask}>
            <Text>Close Tasks</Text>
            <Text>10</Text>
          </View>
        </View>
      </View>
      <View style={styles.projectContent}>
        <Text style={styles.projectTitle}>Available Projects: </Text>
        <Text style={styles.projectNames}>sample projects</Text>
        <Text style={styles.projectNames}>sample projects</Text>
      </View>
      <View style={styles.tasksContent}>
        <Text style={styles.projectTitle}>Available Projects: </Text>
        <Text style={styles.projectNames}>sample projects</Text>
        <Text style={styles.projectNames}>sample projects</Text>
      </View>
      
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D9D9D9",
  },
  taskContent: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 20,
  },
  taskStatus: {
    flexDirection: "row",
    gap: 90,
  },
  projectContent: {
    marginTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 80,
    backgroundColor: "white",
    borderRadius: 20,
  },
  projectTitle: {
    right: "30%",
  },
  projectNames: {
    left: "20%",
    marginBottom: 5,
  },
  tasksContent: {
    marginTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 80,
    backgroundColor: "white",
    borderRadius: 20,
  },
});
