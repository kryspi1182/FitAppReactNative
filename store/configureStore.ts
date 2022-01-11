//Program powstał na Wydziale Informatyki Politechniki Białostockiej

import { configureStore } from "@reduxjs/toolkit";
import reduxThunk from "redux-thunk";

import userReducer from "./userSlice";
import productsReducer from "./productsSlice";
import userMacrosReducer from "./userMacrosSlice";
import userMealsReducer from "./userMealsSlice";
import customMealsReducer from "./customMealsSlice";
import medicalConditionsReducer from "./medicalConditionsSlice";
import userSavedDietsReducer from "./userSavedDietsSlice";
import mealsReducer from "./mealsSlice";
import userTrainingsReducer from "./userTrainingsSlice";
import exercisesReducer from "./exercisesSlice";
import bodyTargetsReducer from "./bodyTargetsSlice";
import userSavedTrainingsReducer from "./userSavedTrainingsSlice";
import trainingsReducer from "./trainingsSlice";
import trainingCategoriesReducer from "./trainingCategoriesSlice";
import difficultiesReducer from "./difficultiesSlice";
import trainingConditionsReducer from "./trainingConditionsSlice";
import trainingConditionSeveritiesReducer from "./trainingConditionSeveritiesSlice";
import weightTargetReducer from "./weightTargetSlice";

const store = configureStore({
  // @ts-ignore
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).prepend(reduxThunk),
  reducer: {
    user: userReducer,
    products: productsReducer,
    userMacros: userMacrosReducer,
    userMeals: userMealsReducer,
    medicalConditions: medicalConditionsReducer,
    customMeals: customMealsReducer,
    userSavedDiets: userSavedDietsReducer,
    meals: mealsReducer,
    userTrainings: userTrainingsReducer,
    exercises: exercisesReducer,
    bodyTargets: bodyTargetsReducer,
    userSavedTrainings: userSavedTrainingsReducer,
    trainings: trainingsReducer,
    trainingCategories: trainingCategoriesReducer,
    difficulties: difficultiesReducer,
    trainingConditions: trainingConditionsReducer,
    trainingConditionSeverities: trainingConditionSeveritiesReducer,
    weightTargets: weightTargetReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
