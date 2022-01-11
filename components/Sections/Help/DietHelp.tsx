//Program powstał na Wydziale Informatyki Politechniki Białostockiej

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Text, View, StyleSheet, ScrollView } from "react-native";
import { Divider } from "react-native-paper";

const DietHelp: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Your data:</Text>
        <Text>
          We will calculate your daily macros based on the data you provided in
          your profile.
        </Text>
        <Divider style={styles.divider} />
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Macros of your choice:</Text>
        <Text>
          You decide how much of each macro you want to consume daily.
        </Text>
        <Divider style={styles.divider} />
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Save diet:</Text>
        <Text>
          Save the generated diet with a name of your choice. That diet will
          show up in the "Saved diets" tab.
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

export default DietHelp;
