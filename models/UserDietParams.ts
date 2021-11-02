import { EntityId } from "@reduxjs/toolkit";
import { Macros } from "./Macros";
import { MealCategoryEnum } from "./enums/MealCategoryEnum";

export interface UserDietParams {
    macros: Macros,
    unwantedProductIds: EntityId[],
    conditionIds: EntityId[],
    mealCategory: MealCategoryEnum
};