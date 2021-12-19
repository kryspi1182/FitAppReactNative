import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { EntityId } from "@reduxjs/toolkit";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { Button, useTheme } from "react-native-paper";

import {
  selectAllUserMeals,
  fetchMatchingMeals,
  resetMeals,
} from "../../store/userMealsSlice";
import { selectUserMacros, fetchUserMacros } from "../../store/userMacrosSlice";
import { fetchProducts } from "../../store/productsSlice";
import { selectUser } from "../../store/userSlice";
import DietResult from "./DietResult";
import { selectAllCustomMeals } from "../../store/customMealsSlice";
import { UserDietParams } from "../../models/UserDietParams";
import { MealCategoryEnum } from "../../models/enums/MealCategoryEnum";
import { DietTypeEnum } from "../../models/enums/DietTypeEnum";
import { fetchMedicalConditions } from "../../store/medicalConditionsSlice";
import { fetchMeals } from "../../store/mealsSlice";
import CustomDiet from "./CustomDiet";
import LoadingModal from "../common/LoadingModal";

const UserDiet: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [chosenOption, setChosenOption] = React.useState("none");
  const [startDietProcess, setStartDietProcess] = React.useState(false);
  const [startCustomDietProcess, setStartCustomDietProcess] =
    React.useState(false);
  const [generateDiet, setGenerateDiet] = React.useState(false);
  const [generateCustomDiet, setGenerateCustomDiet] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [title, setTitle] = React.useState("Generate diet based on your:");
  const [loaded, setLoaded] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const macros = useSelector(selectUserMacros);
  const meals = useSelector(selectAllUserMeals);
  const customMeals = useSelector(selectAllCustomMeals);
  const user = useSelector(selectUser);

  React.useEffect(() => {
    switch (step) {
      case 1:
        setTitle("Generate diet based on your:");
        break;
      case 2:
        setTitle("Almost there:");
        break;
      case 3:
        setTitle("Weekly diet:");
        break;
    }
  }, [step]);
  React.useEffect(() => {
    switch (chosenOption) {
      case "data":
        setStep(2);
        break;
      case "form":
        setStep(2);
        break;
      case "none":
        setStep(1);
        setStartDietProcess(false);
        setStartCustomDietProcess(false);
        setGenerateDiet(false);
        setGenerateCustomDiet(false);
        break;
    }
  }, [chosenOption]);
  React.useEffect(() => {
    if (user.id !== "0") {
      dispatch(fetchUserMacros(null));
      dispatch(fetchProducts());
      dispatch(fetchMedicalConditions());
      dispatch(fetchMeals());
    }
  }, [dispatch]);
  React.useEffect(() => {
    if (user.id !== "0" && macros.calories > 0 && startDietProcess) {
      setLoaded(false);
      handleOpen();
      dispatch(resetMeals());
      const breakfastParams = {
        macros: macros,
        unwantedProductIds: user.unwantedProducts.map((x) => x.productId),
        conditionIds: user.medicalConditions.map((x) => x.medicalConditionId),
        mealCategory: MealCategoryEnum.Breakfast,
        weightTarget: user.weightTargetId,
      } as UserDietParams;
      const lunchParams = {
        macros: macros,
        unwantedProductIds: user.unwantedProducts.map((x) => x.productId),
        conditionIds: user.medicalConditions.map((x) => x.medicalConditionId),
        mealCategory: MealCategoryEnum.Lunch,
        weightTarget: user.weightTargetId,
      } as UserDietParams;
      const snackParams = {
        macros: macros,
        unwantedProductIds: user.unwantedProducts.map((x) => x.productId),
        conditionIds: user.medicalConditions.map((x) => x.medicalConditionId),
        mealCategory: MealCategoryEnum.Snack,
        weightTarget: user.weightTargetId,
      } as UserDietParams;
      const secondBreakfastParams = {
        macros: macros,
        unwantedProductIds: user.unwantedProducts.map((x) => x.productId),
        conditionIds: user.medicalConditions.map((x) => x.medicalConditionId),
        mealCategory: MealCategoryEnum.SecondBreakfast,
        weightTarget: user.weightTargetId,
      } as UserDietParams;
      const dinnerParams = {
        macros: macros,
        unwantedProductIds: user.unwantedProducts.map((x) => x.productId),
        conditionIds: user.medicalConditions.map((x) => x.medicalConditionId),
        mealCategory: MealCategoryEnum.Dinner,
        weightTarget: user.weightTargetId,
      } as UserDietParams;
      dispatch(fetchMatchingMeals(breakfastParams));
      dispatch(fetchMatchingMeals(lunchParams));
      dispatch(fetchMatchingMeals(snackParams));
      dispatch(fetchMatchingMeals(secondBreakfastParams));
      dispatch(fetchMatchingMeals(dinnerParams));
      setStep(3);
    }
  }, [startDietProcess]);

  React.useEffect(() => {
    if (startCustomDietProcess) {
      setLoaded(false);
      handleOpen();
    }
  }, [startCustomDietProcess]);

  React.useEffect(() => {
    if (
      meals.some(
        (meal) => meal.mealCategoryId === MealCategoryEnum.Breakfast
      ) &&
      meals.some(
        (meal) => meal.mealCategoryId === MealCategoryEnum.SecondBreakfast
      ) &&
      meals.some((meal) => meal.mealCategoryId === MealCategoryEnum.Lunch) &&
      meals.some((meal) => meal.mealCategoryId === MealCategoryEnum.Snack) &&
      meals.some((meal) => meal.mealCategoryId === MealCategoryEnum.Dinner) &&
      startDietProcess
    ) {
      setLoaded(true);
      setGenerateDiet(true);
      setGenerateCustomDiet(false);
    }
  }, [meals]);
  React.useEffect(() => {
    if (
      customMeals.some(
        (meal) => meal.mealCategoryId === MealCategoryEnum.Breakfast
      ) &&
      customMeals.some(
        (meal) => meal.mealCategoryId === MealCategoryEnum.SecondBreakfast
      ) &&
      customMeals.some(
        (meal) => meal.mealCategoryId === MealCategoryEnum.Lunch
      ) &&
      customMeals.some(
        (meal) => meal.mealCategoryId === MealCategoryEnum.Snack
      ) &&
      customMeals.some(
        (meal) => meal.mealCategoryId === MealCategoryEnum.Dinner
      ) &&
      startCustomDietProcess
    ) {
      setLoaded(true);
      setGenerateCustomDiet(true);
      setGenerateDiet(false);
    }
  }, [customMeals]);
  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        {/*Did not use ModalWithContent here due to modal showing on a submit button, not a dedicated modal button*/}
        <LoadingModal open={open} setOpen={setOpen} loaded={loaded} />
        <Text style={styles.title}>{title}</Text>
        {chosenOption === "none" && (
          <>
            <Button
              mode="contained"
              compact={true}
              style={styles.button}
              onPress={() => {
                setChosenOption("data");
              }}
              theme={theme}
            >
              Your data
            </Button>
            <Button
              mode="contained"
              compact={true}
              style={styles.button}
              onPress={() => {
                setChosenOption("form");
              }}
              theme={theme}
            >
              Macros of your choice
            </Button>
          </>
        )}
        {chosenOption === "data" && (
          <>
            <Button
              mode="contained"
              compact={true}
              style={styles.button}
              onPress={() => {
                setChosenOption("none");
              }}
              theme={theme}
            >
              Back
            </Button>
            <Button
              mode="contained"
              compact={true}
              style={styles.button}
              onPress={() => {
                setStartDietProcess(true);
              }}
              theme={theme}
            >
              Generate diet
            </Button>
          </>
        )}
        {chosenOption === "form" && (
          <>
            <Button
              mode="contained"
              compact={true}
              style={styles.button}
              onPress={() => {
                setChosenOption("none");
              }}
              theme={theme}
            >
              Back
            </Button>
            <CustomDiet setStartProcess={setStartCustomDietProcess} />
          </>
        )}
        {generateDiet && (
          <DietResult
            generateDiet={generateDiet}
            setGenerateDiet={setGenerateDiet}
            dietType={DietTypeEnum.Data}
          />
        )}
        {generateCustomDiet && (
          <DietResult
            generateDiet={generateCustomDiet}
            setGenerateDiet={setGenerateCustomDiet}
            dietType={DietTypeEnum.Custom}
          />
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
  },
  button: {
    width: "75%",
    alignSelf: "center",
    margin: 10,
    //backgroundColor: '#4c8bf5'
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    margin: 10,
  },
});

export default UserDiet;
