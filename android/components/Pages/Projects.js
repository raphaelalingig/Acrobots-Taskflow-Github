import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {
  Portal,
  Modal,
  TextInput,
  Text,
  Button,
  DataTable,
} from "react-native-paper";
import axios from "axios";
import DueDateDropdown from "./DueDateDropdown/DueDate";

const Projects = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(null);
  const [secondDate, setSecondDate] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const postdata = async () => {
    try {
      const response = await axios.post(
        "http://192.168.1.15:8080/api/projects/",
        {
          project_name: projectName,
          start_date: selectedStartDate,
          due_date: selectedEndDate,
          description: description,
        }
      );
      console.log("Project added successfully:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = () => {
    console.log("Project Name:", projectName);
    console.log("Description:", description);
    console.log("Start Date:", selectedStartDate);
    console.log("End Date:", selectedEndDate);
    postdata();
    hideModal();
    setProjectName("");
    setDescription("");
    setSelectedStartDate(null);
    setSelectedEndDate(null);
  };

  const containerStyle = { backgroundColor: "white", padding: 20 };

  return (
    <View style={styles.container}>
      <ScrollView>
        <DataTable
          style={{
            backgroundColor: "white",
            padding: 10,
          }}
        >
          <DataTable>
            <DataTable.Header style={{ height: 60 }}>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>Status</DataTable.Title>
              <DataTable.Title>Due Date</DataTable.Title>
              <DataTable.Title>Actions</DataTable.Title>
            </DataTable.Header>
            <DataTable.Row>
              <DataTable.Cell>sample 1</DataTable.Cell>
              <DataTable.Cell>sample 2</DataTable.Cell>
              <DataTable.Cell>sample 3</DataTable.Cell>
              <DataTable.Cell>
                <TouchableOpacity>
                  <Button style={{ backgroundColor: "red" }}>
                    <Text style={{ color: "white" }}>DELETE</Text>
                  </Button>
                </TouchableOpacity>
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </DataTable>
      </ScrollView>
      <View style={styles.plusButton}>
        <Portal>
          <Modal
            visible={modalVisible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <View style={styles.modal}>
              <View style={styles.title}>
                <Text variant="headlineSmall">New Project: </Text>
              </View>
              <View
                style={{
                  borderWidth: 0.5,
                  backgroundColor: "#D9D9D9",
                  margin: 5,
                }}
              ></View>

              <View style={styles.bodyText}>
                <View style={styles.inputs}>
                  <TextInput
                    label="Project Name"
                    mode="outlined"
                    value={projectName}
                    onChangeText={setProjectName}
                  />
                </View>
                <View>
                  <TouchableOpacity>
                    <DueDateDropdown
                      setSelectedStartDate={setSelectedStartDate}
                      setSelectedEndDate={setSelectedEndDate}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.inputs}>
                  <TextInput
                    label="Description"
                    mode="outlined"
                    value={description}
                    onChangeText={setDescription}
                  />
                </View>
                <View style={styles.modalButtons}>
                  <Button style={styles.modaButtonCancel} onPress={hideModal}>
                    <Text style={{ color: "white" }}>Cancel</Text>
                  </Button>
                  <Button
                    style={styles.modaButtonSubmit}
                    onPress={handleSubmit}
                  >
                    <Text style={{ color: "white" }}>Submit</Text>
                  </Button>
                </View>
              </View>
            </View>
          </Modal>
        </Portal>
        <TouchableOpacity onPress={showModal}>
          <AntDesign name="pluscircle" size={64} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#D9D9D9",
  },
  head: { height: 60, backgroundColor: "white", borderWidth: 1 },
  text: { margin: 10 },
  row: { flexDirection: "row", backgroundColor: "white" },
  btn: {
    width: 58,
    height: 18,
    backgroundColor: "red",
    borderRadius: 6,
    justifyContent: "center",
  },
  btnText: { textAlign: "center", color: "#fff" },
  plusButton: {
    position: "absolute",
    right: "5%",
    bottom: "5%",
  },
  bodyText: {
    gap: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modaButtonCancel: {
    padding: 5,
    backgroundColor: "red",
    marginRight: 10,
  },
  modaButtonSubmit: {
    padding: 5,
    backgroundColor: "blue",
  },
  inputDate: {
    width: 165,
  },
  inputs: {
    marginBottom: 10,
  },
  title: {
    marginBottom: 10,
  },
});

export default Projects;
