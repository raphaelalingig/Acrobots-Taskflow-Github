import { StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import {
  Portal,
  Modal,
  TextInput,
  Text,
  Button,
  DataTable,
} from "react-native-paper";

const Authors = () => {
  const [authorData, setAuthorData] = useState([]);
  useEffect(() => {
    fetchAuthor();
  }, []);

  const fetchAuthor = async () => {
    try {
      const response = await fetch("http://172.22.157.246:8080/api/author/");
      if (!response.ok) {
        throw new Error("Failed to fetch authors");
      }
      const data = await response.json();
      setAuthorData(data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  return (
    <DataTable>
      <DataTable.Header style={{ height: 60 }}>
        <DataTable.Title>First name</DataTable.Title>
        <DataTable.Title>Last name</DataTable.Title>
        <DataTable.Title>Email address</DataTable.Title>
      </DataTable.Header>
      {authorData.map((author) => (
        <DataTable.Row key={author.id} value={author.id}>
          <DataTable.Cell style={{ marginRight: 3 }}>
            {author.first_name}
          </DataTable.Cell>
          <DataTable.Cell style={{ marginHorizontal: 3 }}>
            {author.last_name}
          </DataTable.Cell>
          <DataTable.Cell style={{ marginHorizontal: 3 }}>
            {author.email}
          </DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
};

export default Authors;

const styles = StyleSheet.create({});
