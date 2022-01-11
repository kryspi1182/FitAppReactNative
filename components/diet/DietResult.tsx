//Program powstał na Wydziale Informatyki Politechniki Białostockiej

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { EntityId } from "@reduxjs/toolkit";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import Dialog from "react-native-dialog";

import { selectAllUserMeals } from "../../store/userMealsSlice";
import WeekDietBox from "./WeekDietBox";
import { DietTypeEnum } from "../../models/enums/DietTypeEnum";
import { selectAllCustomMeals } from "../../store/customMealsSlice";
import { selectUser } from "../../store/userSlice";
import { Meal } from "../../models/Meal";
import { UserSavedDietParams } from "../../models/UserSavedDietParams";
import { addUserSavedDiet } from "../../store/userSavedDietsSlice";
import { MealCategoryEnum } from "../../models/enums/MealCategoryEnum";
import ModalWithContent from "../common/ModalWithContent";
import SaveDietModal from "./SaveDietModal";

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

type Props = {
  generateDiet: boolean;
  setGenerateDiet: Function;
  dietType: DietTypeEnum;
};

const DietResult: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  const [dietReady, setDietReady] = React.useState(false);
  const [breakfasts, setBreakfasts] = React.useState(Array<EntityId>());
  const [lunches, setLunches] = React.useState(Array<EntityId>());
  const [snacks, setSnacks] = React.useState(Array<EntityId>());
  const [secondBreakfasts, setSecondBreakfasts] = React.useState(
    Array<EntityId>()
  );
  const [dinners, setDinners] = React.useState(Array<EntityId>());
  const [dietBreakfast, setDietBreakfast] = React.useState(Array<EntityId>());
  const [dietSecondBreakfast, setDietSecondBreakfast] = React.useState(
    Array<EntityId>()
  );
  const [dietLunch, setDietLunch] = React.useState(Array<EntityId>());
  const [dietSnack, setDietSnack] = React.useState(Array<EntityId>());
  const [dietDinner, setDietDinner] = React.useState(Array<EntityId>());
  const [dietSaved, setDietSaved] = React.useState(false);
  const [showDialog, setShowDialog] = React.useState(false);
  const [dietName, setDietName] = React.useState("");

  const meals = useSelector(selectAllUserMeals);
  const customMeals = useSelector(selectAllCustomMeals);
  const user = useSelector(selectUser);
  var resultMeals = [] as Meal[];
  switch (props.dietType) {
    case DietTypeEnum.Data:
      resultMeals = meals;
      break;
    case DietTypeEnum.Custom:
      resultMeals = customMeals;
      break;
  }

  const pickDietMeals = () => {
    const breakfastIds = breakfasts.length;
    const lunchIds = lunches.length;
    const snackIds = snacks.length;
    const secondBreakfastIds = secondBreakfasts.length;
    const dinnerIds = dinners.length;
    for (var i = 0; i < 7; i++) {
      setDietBreakfast((old) => [
        ...old,
        breakfasts[getRandomInt(breakfastIds)],
      ]);
      setDietSecondBreakfast((old) => [
        ...old,
        secondBreakfasts[getRandomInt(secondBreakfastIds)],
      ]);
      setDietLunch((old) => [...old, lunches[getRandomInt(lunchIds)]]);
      setDietSnack((old) => [...old, snacks[getRandomInt(snackIds)]]);
      setDietDinner((old) => [...old, dinners[getRandomInt(dinnerIds)]]);
    }
    setDietReady(true);
  };

  const handleCancel = () => {
    setShowDialog(false);
  };

  const handleSave = () => {
    saveDiet();
    setShowDialog(false);
  };

  const saveDiet = () => {
    const dietMeals = [
      ...dietBreakfast,
      ...dietSecondBreakfast,
      ...dietLunch,
      ...dietSnack,
      ...dietDinner,
    ];
    if (dietName) {
      const savedDietParams = {
        userId: user.id,
        name: dietName,
        mealIds: dietMeals,
      } as UserSavedDietParams;
      dispatch(addUserSavedDiet(savedDietParams));
      setDietSaved(true);
    }
  };

  React.useEffect(() => {
    if (
      breakfasts.length > 0 &&
      lunches.length > 0 &&
      snacks.length > 0 &&
      secondBreakfasts.length > 0 &&
      dinners.length > 0
    ) {
      pickDietMeals();
    }
  }, [breakfasts, lunches, snacks, secondBreakfasts, dinners]);

  React.useEffect(() => {
    if (props.generateDiet && resultMeals.length > 0) {
      setBreakfasts(
        resultMeals
          .filter((meal) => meal.mealCategoryId === MealCategoryEnum.Breakfast)
          .map((meal) => meal.id)
      );
      setLunches(
        resultMeals
          .filter((meal) => meal.mealCategoryId === MealCategoryEnum.Lunch)
          .map((meal) => meal.id)
      );
      setSnacks(
        resultMeals
          .filter((meal) => meal.mealCategoryId === MealCategoryEnum.Snack)
          .map((meal) => meal.id)
      );
      setSecondBreakfasts(
        resultMeals
          .filter(
            (meal) => meal.mealCategoryId === MealCategoryEnum.SecondBreakfast
          )
          .map((meal) => meal.id)
      );
      setDinners(
        resultMeals
          .filter((meal) => meal.mealCategoryId === MealCategoryEnum.Dinner)
          .map((meal) => meal.id)
      );
    }
  }, [props.generateDiet]);

  React.useEffect(() => {
    if (dietName !== "") {
      saveDiet();
    }
  }, [dietName]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {dietReady &&
        dietBreakfast.length === 7 &&
        dietSecondBreakfast.length === 7 &&
        dietLunch.length === 7 &&
        dietSnack.length === 7 &&
        dietDinner.length === 7 && (
          <WeekDietBox
            breakfasts={dietBreakfast}
            secondBreakfasts={dietSecondBreakfast}
            lunches={dietLunch}
            snacks={dietSnack}
            dinners={dietDinner}
          />
        )}
      {!dietSaved && (
        <ModalWithContent
          title="Save diet"
          content={<SaveDietModal setInput={setDietName} />}
          buttonStyle={styles.button}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    //alignItems: 'stretch',
    justifyContent: "center",
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

export default DietResult;
