//Program powstał na Wydziale Informatyki Politechniki Białostockiej

import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform, StyleSheet } from "react-native";
import Authorize from "../components/api_authorization/Authorize";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import UserTraining from "../components/training/UserTraining";

export default function TrainingScreen() {
  return (
    <View style={styles.container}>
      <UserTraining />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
