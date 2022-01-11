//Program powstał na Wydziale Informatyki Politechniki Białostockiej

import * as React from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { List, Chip } from "react-native-paper";

import { MealWithProducts } from "../../models/MealWithProducts";
import MealWithProductsItem from "./MealWithProductsItem";

type Props = {
  meals: MealWithProducts[];
  day: string;
};

const DayDietBox: React.FC<Props> = (props) => {
  return (
    <View>
      {props.meals.length === 5 && (
        <List.Accordion title={props.day} style={styles.accordion}>
          <View style={styles.container}>
            <MealWithProductsItem label="Breakfast" meal={props.meals[0]} />
            <MealWithProductsItem
              label="Second breakfast"
              meal={props.meals[1]}
            />
            <MealWithProductsItem label="Lunch" meal={props.meals[2]} />
            <MealWithProductsItem label="Snack" meal={props.meals[3]} />
            <MealWithProductsItem label="Dinner" meal={props.meals[4]} />
          </View>
        </List.Accordion>
      )}
      {props.meals.length !== 5 && <Text>Wrong data format</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#000",
    padding: 5,
    //margin: 5,
  },
  accordion: {
    paddingLeft: 20,
    backgroundColor: "#fff",
  },
  text: {
    //flex: 1,
    paddingLeft: 15,
  },
  targetContainer: {
    //flexWrap: "nowrap",
    padding: 5,
  },
  button: {
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#000",
    margin: 10,
  },
});

export default DayDietBox;
