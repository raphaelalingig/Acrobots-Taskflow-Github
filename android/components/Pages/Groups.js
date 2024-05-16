import React, { Component } from "react";
import {
  StyleSheet,
  View,
  
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Portal, Modal, TextInput, Text, Button } from "react-native-paper";

import { Table, TableWrapper, Row, Cell } from "react-native-table-component";
export default class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ["Group Name", "Members", "Projects", "Actions"],
      tableData: [
        ["1", "2", "3", "4"],
        ["a", "b", "c", "d"],
        ["1", "2", "3", "4"],
        ["a", "b", "c", "d"],
      ],
    };
  }

  _alertIndex(index) {
    Alert.alert(`This is row ${index + 1}`);
  }
  showModal = () => {
    this.setState({ modalVisible: true });
  };

  hideModal = () => {
    this.setState({ modalVisible: false });
  };

  render() {
    const state = this.state;
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>DELETE</Text>
        </View>
      </TouchableOpacity>
    );
    const containerStyle = { backgroundColor: "white", padding: 20 };

    return (
      <View style={styles.container}>
        <ScrollView>
          <Table borderStyle={{ borderColor: "transparent" }}>
            <Row
              data={state.tableHead}
              style={styles.head}
              textStyle={styles.text}
            />
            {state.tableData.map((rowData, index) => (
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
              visible={state.modalVisible}
              onDismiss={this.hideModal}
              contentContainerStyle={containerStyle}
            >
              {/* Modal content goes here */}
              <View style={styles.modal}>
                <View style={styles.title}>
                  <Text variant="headlineSmall">Add New Group: </Text>
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
                    <TextInput label="Group Name" mode="outlined" />
                  </View>
                  <View style={styles.inputs}>
                    <TextInput label="Members" mode="outlined" />
                  </View>
                  <View style={styles.inputs}>
                    <TextInput label="Projects" mode="outlined" />
                  </View>
                  <View style={styles.modalButtons}>
                    <TouchableOpacity onPress={this.hideModal}>
                      <Button style={styles.modaButtonCancel}>
                        <Text style={{ color: "white" }}>Cancel</Text>
                      </Button>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Button style={styles.modaButtonSubmit}>
                        <Text style={{ color: "white" }}>Submit</Text>
                      </Button>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </Portal>
          <TouchableOpacity onPress={this.showModal}>
            <AntDesign name="pluscircle" size={64} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

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
  btn: { width: 58, height: 18, backgroundColor: "red", borderRadius: 6 },
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
    left: "68%",
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
});
