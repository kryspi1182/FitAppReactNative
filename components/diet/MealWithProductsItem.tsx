import * as React from "react";
import { List, Chip, Divider } from "react-native-paper";
import { Button, Text, View, StyleSheet } from "react-native";

import { MealWithProducts } from "../../models/MealWithProducts";
import ModalWithContent from "../common/ModalWithContent";
import MealDetails from "./MealDetails";

type Props = {
  meal: MealWithProducts;
  label: string;
};

const MealWithProductsItem: React.FC<Props> = (props) => {
  return (
    <List.Accordion title={props.label} style={styles.accordion}>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.col}>
            <ModalWithContent
              title="Details"
              content={<MealDetails mealId={props.meal.meal.id} />}
              buttonStyle={styles.button}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <List.Item
              title="Name"
              description={props.meal.meal.name}
              style={styles.listItem}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <List.Item
              title="Description"
              description={props.meal.meal.description}
              style={styles.listItem}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <List.Item
              title="Recipe"
              description={props.meal.meal.recipe}
              style={styles.listItem}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <View style={styles.textContainer}>
              <Text>Products:</Text>
            </View>
          </View>
          <View style={styles.col}>
            <View style={styles.targetContainer}>
              {props.meal.products.map((product) => {
                return (
                  <Chip
                    key={product.id + " " + props.meal.meal.id}
                    style={styles.chip}
                    textStyle={styles.chipText}
                  >
                    <View style={styles.chipTextContainer}>
                      <Text style={styles.chipText}>
                        {product.name.length > 10
                          ? product.name.substring(0, 10) + "..."
                          : product.name}
                      </Text>
                    </View>
                  </Chip>
                );
              })}
            </View>
          </View>
        </View>
        <Divider style={styles.divider} />
      </View>
    </List.Accordion>
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

export default MealWithProductsItem;
