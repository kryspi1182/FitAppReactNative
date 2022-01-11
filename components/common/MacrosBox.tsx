//Program powstał na Wydziale Informatyki Politechniki Białostockiej

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { List, Chip } from "react-native-paper";
import { Text, ScrollView, StyleSheet, View } from "react-native";
import { EntityId } from "@reduxjs/toolkit";
import { Macros } from "../../models/Macros";

type Props = {
  macros: Macros;
};

const MacrosBox: React.FC<Props> = (props) => {
  return (
    <ScrollView>
      <List.Accordion title="Macros per 100g" style={styles.accordion}>
        <View style={styles.row}>
          <View style={styles.col}>
            <List.Item
              title="Calories"
              description={props.macros.calories + " kcal"}
            />
          </View>
          <View style={styles.col}>
            <List.Item
              title="Carbohydrates"
              description={props.macros.carbohydrates + " g"}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <List.Item
              title="Protein"
              description={props.macros.protein + " g"}
            />
          </View>
          <View style={styles.col}>
            <List.Item title="Fat" description={props.macros.fat + " g"} />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <List.Item title="Sugar" description={props.macros.sugar + " g"} />
          </View>
          <View style={styles.col}>
            <List.Item title="Fibre" description={props.macros.fibre + " g"} />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <List.Item title="Salt" description={props.macros.salt + " g"} />
          </View>
        </View>
      </List.Accordion>
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
    padding: 30,
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

export default MacrosBox;
