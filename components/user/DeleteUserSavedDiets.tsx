//Program powstał na Wydziale Informatyki Politechniki Białostockiej

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { EntityId } from "@reduxjs/toolkit";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { Button, Divider, useTheme } from "react-native-paper";
import {
  deleteUserSavedDiet,
  selectAllUserSavedDiets,
} from "../../store/userSavedDietsSlice";

const DeleteUserSavedDiets: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const userSavedDiets = useSelector(selectAllUserSavedDiets);
  const handleDelete = (id: EntityId) => {
    dispatch(deleteUserSavedDiet(id));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text>
            You have exceeded your limit of 5 saved diets. Delete one of your
            diets in order to save the new one.
          </Text>
          <Divider style={styles.divider} />
        </View>
      </View>
      {userSavedDiets.map((savedDiet) => (
        <View style={styles.row}>
          <View style={styles.col}>
            <Text>{savedDiet.name}</Text>
          </View>
          <View style={styles.col}>
            <Button
              onPress={() => handleDelete(savedDiet.id)}
              theme={theme}
              style={styles.button}
            >
              Delete
            </Button>
          </View>
        </View>
      ))}
      <Divider style={styles.divider} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  chip: {
    alignSelf: "center",
    margin: 5,
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    // flex: 1,
    // flexDirection: "row",
    //alignItems: 'center'
    padding: 10,
  },
  accordion: {
    paddingLeft: 20,
    backgroundColor: "#fff",
  },
  textContainer: {
    marginTop: "auto",
    marginBottom: "auto",
  },
  chipTextContainer: {
    marginTop: "auto",
    marginBottom: "auto",
    alignItems: "center",
  },
  chipText: {
    //flex: 1,
    //paddingLeft: 15,
    color: "#fff",
  },
  targetContainer: {
    //flexWrap: "nowrap",
    //paddingRight: 30,
  },
  row: {
    flexDirection: "row",
  },
  col: {
    flex: 1,
    marginTop: "auto",
    marginBottom: "auto",
  },
  icon: {
    marginTop: "auto",
    marginBottom: "auto",
  },
  divider: {
    height: 3,
    borderRadius: 2,
    backgroundColor: "#000",
    marginTop: 3,
  },
  listItem: {
    marginLeft: 0,
    paddingLeft: 0,
  },
  button: {
    maxWidth: "75%",
    alignSelf: "center",
    margin: 10,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#000",
  },
});

export default DeleteUserSavedDiets;
