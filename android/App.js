import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { PaperProvider, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Navigation from "./components/Navigation/Navigation";

const App = () => {
  return (
    <PaperProvider style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <Navigation />
      </SafeAreaView>
    </PaperProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
