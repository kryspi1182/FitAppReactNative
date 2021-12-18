import * as React from "react";
import { Button, Text, View } from "react-native";
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
        <List.Accordion title={props.day}>
          <MealWithProductsItem label="Breakfast" meal={props.meals[0]} />
          <MealWithProductsItem
            label="Second breakfast"
            meal={props.meals[1]}
          />
          <MealWithProductsItem label="Lunch" meal={props.meals[2]} />
          <MealWithProductsItem label="Snack" meal={props.meals[3]} />
          <MealWithProductsItem label="Dinner" meal={props.meals[4]} />
        </List.Accordion>
      )}
      {props.meals.length !== 5 && <Text>Wrong data format</Text>}
    </View>
  );
};

export default DayDietBox;
