import { EntityId } from "@reduxjs/toolkit";
import { Meal } from "./Meal";

export interface UserSavedDietMeal {
    id: EntityId,
    userSavedDietId: EntityId,
    mealId: EntityId,
    meal: Meal
};