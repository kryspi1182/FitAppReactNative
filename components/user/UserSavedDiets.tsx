import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { EntityId } from "@reduxjs/toolkit";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { List, Chip, Button, useTheme } from "react-native-paper";

import {
  deleteUserSavedDiet,
  selectAllUserSavedDiets,
} from "../../store/userSavedDietsSlice";
import WeekDietBox from "../diet/WeekDietBox";

const UserSavedDiets: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const userDiets = useSelector(selectAllUserSavedDiets);

  const handleDelete = (id: EntityId) => {
    dispatch(deleteUserSavedDiet(id));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {userDiets.map((userDiet) => {
        let breakfasts = [] as EntityId[];
        let secondBreakfasts = [] as EntityId[];
        let lunches = [] as EntityId[];
        let snacks = [] as EntityId[];
        let dinners = [] as EntityId[];
        for (var i = 0; i < userDiet.meals.length; i++) {
          switch (i % 5) {
            case 0:
              breakfasts.push(userDiet.meals[i].mealId);
              break;
            case 1:
              secondBreakfasts.push(userDiet.meals[i].mealId);
              break;
            case 2:
              lunches.push(userDiet.meals[i].mealId);
              break;
            case 3:
              snacks.push(userDiet.meals[i].mealId);
              break;
            case 4:
              dinners.push(userDiet.meals[i].mealId);
              break;
          }
        }
        return (
          <List.Accordion title={userDiet.name} style={styles.accordion}>
            <View style={styles.dietContainer}>
              <View style={styles.row}>
                <WeekDietBox
                  breakfasts={breakfasts}
                  secondBreakfasts={secondBreakfasts}
                  lunches={lunches}
                  snacks={snacks}
                  dinners={dinners}
                  key={userDiet.name}
                />
              </View>
              <View style={styles.row}>
                <Button
                  onPress={() => handleDelete(userDiet.id)}
                  theme={theme}
                  style={styles.button}
                >
                  Delete
                </Button>
              </View>
            </View>
          </List.Accordion>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
  },
  dietContainer: {
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#000",
    //padding: 5,
    margin: 5,
  },
  button: {
    width: "75%",
    alignSelf: "center",
    margin: 10,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#000",
  },
  accordion: {
    backgroundColor: "#fff",
  },
  row: {
    padding: 5,
  },
});

export default UserSavedDiets;
