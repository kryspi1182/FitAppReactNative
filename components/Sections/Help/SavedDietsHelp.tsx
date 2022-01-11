//Program powstał na Wydziale Informatyki Politechniki Białostockiej

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Text, View, StyleSheet, ScrollView } from "react-native";
import { Divider } from "react-native-paper";

const SavedDietsHelp: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Saved diets:</Text>
        <Text>
          Here you have access to all your saved diets. You can save max 5
          diets.
        </Text>
        <Divider style={styles.divider} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  section: {
    marginBottom: 10,
  },
  divider: {
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#000000",
    height: 3,
    borderRadius: 2,
  },
  title: {
    fontSize: 16,
    textDecorationLine: "underline",
  },
  subtitle: {
    fontSize: 14,
    textDecorationLine: "underline",
  },
});

export default SavedDietsHelp;
