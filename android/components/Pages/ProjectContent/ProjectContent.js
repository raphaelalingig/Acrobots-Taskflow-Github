import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";

const ProjectContents = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const route = useRoute();
  const { project_name } = route.params;
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskData, setTaskData] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);

  useEffect(() => {
    fetchTaskData();
  }, [project_name]);

  const fetchTaskData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8080/api/projects/${project_name}/tasks/`
      );

      if (response.status !== 200) {
        throw new Error("Failed to fetch tasks");
      }

      setTaskData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = (updatedTask) => {
    const updatedTasks = taskData.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTaskData(updatedTasks);
  };

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setEditModalOpen(true);
  };

  const addNewTask = (newTask) => {
    setTasks([...tasks, newTask]);
    setModalOpen(false);
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8080/api/projects/${project_name}/tasks/${taskId}/`
      );
      setTaskData(taskData.filter((task) => task.id !== taskId));
      Alert.alert("Success", "Task deleted successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskName}>{item.task_name}</Text>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => {
          setSelectedStatus(item.status);
          setDropdownVisible(true);
        }}
      >
        <Text style={styles.dropdownButtonText}>{item.status}</Text>
      </TouchableOpacity>
      <Text>
        {item.start_date} - {item.due_date}
      </Text>
      <Text>{item.get_user_name}</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => handleEditClick(item)}
      >
        <Text style={styles.buttonText}>EDIT</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteTask(item.id)}
      >
        <Text style={styles.buttonText}>DELETE</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Aside />
      <View style={styles.header}>
        <TextInput style={styles.searchInput} placeholder="Search for items" />
        <Button title="+ Add Task" onPress={() => setModalOpen(true)} />
      </View>
      <FlatList
        data={taskData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      {dropdownVisible && (
        <Modal
          transparent={true}
          animationType="none"
          visible={dropdownVisible}
          onRequestClose={() => setDropdownVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setDropdownVisible(false)}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            {["Not Started", "In Progress", "Completed"].map(
              (status, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedStatus(status);
                    setDropdownVisible(false);
                    // Update the status of the selected task
                    const updatedTask = { ...selectedTask, status };
                    updateTask(updatedTask);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{status}</Text>
                </TouchableOpacity>
              )
            )}
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  taskItem: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 1,
  },
  taskName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  dropdownButton: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  dropdownButtonText: {
    color: "#333",
    textAlign: "center",
  },
  editButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    position: "absolute",
    top: "30%",
    left: "10%",
    right: "10%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  dropdownItemText: {
    textAlign: "center",
    fontSize: 16,
  },
});

export default ProjectContents;
