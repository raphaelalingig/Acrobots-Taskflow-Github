import React, { useEffect, useState } from "react";
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
import { Picker } from "@react-native-picker/picker";

const Tasks = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [assignee, setAssignee] = useState("");
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);
  const fetchUserData = async () => {
    try {
      const response = await fetch("http://192.168.1.15:8080/api/user/");
      if (!response.ok) {
        console.log("Failed to fetch Users");
        throw new Error("Failed to fetch Users");
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  const postdata = async () => {
    try {
      const response = await axios.post("http://192.168.1.15:8080/api/task/", {
        task_name: taskName,
        assignee: assignee,
        description: description,
        start_date: selectedStartDate,
        due_date: selectedEndDate,
      });
      console.log("Task added successfully", response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const handleSubmit = () => {
    console.log("Task Name:", taskName);
    console.log("Description:", description);
    console.log("Start Date:", selectedStartDate);
    console.log("End Date:", selectedEndDate);
    console.log("Assignee: ", assignee);
    postdata();
    hideModal();
    setTaskName("");
    setAssignee("");
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
                <Text variant="headlineSmall">New Task: </Text>
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
                    label="Task Name"
                    mode="outlined"
                    value={taskName}
                    onChangeText={setTaskName}
                  />
                </View>
                <View style={styles.inputs}>
                  <TouchableOpacity>
                    <DueDateDropdown
                      setSelectedStartDate={setSelectedStartDate}
                      setSelectedEndDate={setSelectedEndDate}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.inputs}>
                  <Text>Select Assignee:</Text>
                  <Picker
                    selectedValue={assignee}
                    onValueChange={(itemValue, itemIndex) =>
                      setAssignee(itemValue)
                    }
                  >
                    <Picker.Item label="Select Assignee" value="" />
                    {userData.map((user) => (
                      <Picker.Item
                        key={user.id}
                        label={user.username}
                        value={user.id}
                      />
                    ))}
                  </Picker>
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

export default Tasks;
