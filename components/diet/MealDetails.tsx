//Program powstał na Wydziale Informatyki Politechniki Białostockiej

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { List, Chip, Divider } from "react-native-paper";
import { Text, View, StyleSheet } from "react-native";
import { EntityId } from "@reduxjs/toolkit";

import { selectAllProducts } from "../../store/productsSlice";
import { selectMealById } from "../../store/mealsSlice";
import { RootState } from "../../store/configureStore";
import { MealWithProducts } from "../../models/MealWithProducts";
import { Macros } from "../../models/Macros";
import { ScrollView } from "react-native-gesture-handler";
import MacrosBox from "../common/MacrosBox";

type Props = {
  mealId: EntityId;
};

const MealDetails: React.FC<Props> = (props) => {
  const products = useSelector(selectAllProducts);
  let meal = useSelector((state: RootState) =>
    selectMealById(state, props.mealId)
  );
  let mealProducts =
    meal !== undefined
      ? products.filter((product) =>
          meal.mealProducts.some(
            (mealProduct) => mealProduct.productId === product.id
          )
        )
      : [];
  let mealWithProducts = {
    meal: meal,
    products: mealProducts,
  } as MealWithProducts;
  let macros = {
    calories: 0,
    fat: 0,
    carbohydrates: 0,
    sugar: 0,
    fibre: 0,
    protein: 0,
    salt: 0,
  } as Macros;

  mealWithProducts.products.forEach((product) => {
    macros.calories += product.calories;
    macros.fat += product.fat;
    macros.carbohydrates += product.carbohydrates;
    macros.sugar += product.sugar;
    macros.fibre += product.fibre;
    macros.protein += product.protein;
    macros.salt += product.salt;
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.row}>
        <View style={styles.col}>
          <MacrosBox macros={macros} />
          <Divider style={styles.divider} />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.col}></View>
      </View>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text>{mealWithProducts.meal.name}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.subtitle}>Description:</Text>
          <Text>{mealWithProducts.meal.description}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.subtitle}>Recipe:</Text>
          <Text>{mealWithProducts.meal.recipe}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.subtitle}>Products:</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.col}>
          {mealWithProducts.products.map((product) => {
            let quantity = mealWithProducts.meal.mealProducts.find(
              (mp) => mp.productId === product.id
            );
            if (quantity) {
              return (
                <Chip
                  key={product.id + "" + quantity.mealId}
                  style={styles.chip}
                >
                  <View style={styles.chipTextContainer}>
                    <Text style={styles.chipText}>
                      {product.name + " " + quantity.quantity * 100 + "g"}
                    </Text>
                  </View>
                </Chip>
              );
            }
          })}
        </View>
      </View>

      <Divider style={styles.divider} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    margin: 0,
  },
  divider: {
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#000000",
    height: 3,
    borderRadius: 2,
  },
  row: {
    flexDirection: "row",
  },
  col: {
    flex: 1,
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
  chip: {
    alignSelf: "center",
    margin: 5,
    flex: 1,
    backgroundColor: "#000",
  },
  subtitle: {
    fontSize: 14,
    textDecorationLine: "underline",
  },
});

export default MealDetails;
