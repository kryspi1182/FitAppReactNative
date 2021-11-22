import { EntityId } from "@reduxjs/toolkit";
import { UserSavedDietMeal } from "./UserSavedDietMeal";

export interface UserSavedDiet {
    id: EntityId,
    userId: EntityId,
    name: string,
    meals: Array<UserSavedDietMeal>
};