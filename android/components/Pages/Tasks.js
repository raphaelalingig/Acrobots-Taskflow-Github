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
import { Table, TableWrapper, Row, Cell } from "react-native-table-component";
import { Portal, Modal, TextInput, Text, Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { Dropdown } from "react-native-element-dropdown";

const formatDate = (date) => {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Projects = () => {
  const [tableHead] = useState(["Task Name", "Status", "Due date", "Actions"]);
  const [tableData, setTableData] = useState([
    ["Project A", "In Progress", "2024/05/20", "4"],
    ["Project B", "Completed", "2024/05/15", "d"],
    ["Project C", "Not Started", "2024/05/25", "4"],
    ["Project D", "Delayed", "2024/05/30", "d"],
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(null);
  const [secondDate, setSecondDate] = useState(null);

  const [showFirstDatePicker, setShowFirstDatePicker] = useState(false);
  const [showSecondDatePicker, setShowSecondDatePicker] = useState(false);

  const [taskName, settaskName] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };
  const postdata = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8080/api/task/", {
        task_name: taskName,
        start_date: date,
        due_date: secondDate,
        description: description,
      });
      console.log("Project added successfully:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = () => {
    console.log("Task Name:", taskName);
    console.log("Start Date:", formatDate(date));
    console.log("End Date:", formatDate(secondDate));
    console.log("Description:", description);
    console.log("Assignee:", assignee);

    postdata();
    hideModal(true);
    setProjectName("");
    setDescription("");
    setDate(null);
    setSecondDate(null);
  };
  const data = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
    { label: "Item 3", value: "3" },
    { label: "Item 4", value: "4" },
    { label: "Item 5", value: "5" },
    { label: "Item 6", value: "6" },
    { label: "Item 7", value: "7" },
    { label: "Item 8", value: "8" },
  ];

  const element = () => (
    <TouchableOpacity>
      <View style={styles.btn}>
        <Text style={styles.btnText}>DELETE</Text>
      </View>
    </TouchableOpacity>
  );

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowFirstDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const onSecondChange = (event, selectedDate) => {
    const currentDate = selectedDate || secondDate;
    setShowSecondDatePicker(Platform.OS === "ios");
    setSecondDate(currentDate);
  };

  const showFirstDatepicker = () => {
    setShowFirstDatePicker(true);
  };

  const showSecondDatepicker = () => {
    setShowSecondDatePicker(true);
  };

  const containerStyle = { backgroundColor: "white", padding: 20 };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Table style={{ borderColor: "black" }}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text} />
          {tableData.map((rowData, index) => (
            <TableWrapper key={index} style={styles.row}>
              {rowData.map((cellData, cellIndex) => (
                <Cell
                  key={cellIndex}
                  data={cellIndex === 3 ? element(cellData, index) : cellData}
                  textStyle={styles.text}
                />
              ))}
            </TableWrapper>
          ))}
        </Table>
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
                    onChangeText={settaskName}
                  />
                </View>
                <View style={styles.inputs}>
                  <View style={{ flexDirection: "row", gap: 20 }}>
                    <TouchableOpacity onPress={showFirstDatepicker}>
                      <TextInput
                        label="Select Start-Date"
                        mode="outlined"
                        value={formatDate(date)}
                        editable={false}
                        style={styles.inputDate}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={showSecondDatepicker}>
                      <TextInput
                        label="Select End-Date"
                        mode="outlined"
                        value={formatDate(secondDate)}
                        editable={false}
                        style={styles.inputDate}
                      />
                    </TouchableOpacity>
                  </View>

                  {showFirstDatePicker && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date || new Date()}
                      mode="date"
                      is24Hour={true}
                      display="default"
                      onChange={onChange}
                    />
                  )}
                  {showSecondDatePicker && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={secondDate || new Date()}
                      mode="date"
                      is24Hour={true}
                      display="default"
                      onChange={onSecondChange}
                    />
                  )}
                </View>

                <View style={styles.inputs}>
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Assignee"
                    searchPlaceholder="Search..."
                    value={assignee}
                  />
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
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default Projects;