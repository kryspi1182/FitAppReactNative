//Program powstał na Wydziale Informatyki Politechniki Białostockiej

import { EntityId } from "@reduxjs/toolkit";
import { Macros } from "./Macros";
import { MealCategoryEnum } from "./enums/MealCategoryEnum";
import { WeightTargetEnum } from "./enums/WeightTargetEnum";

export interface UserDietParams {
  macros: Macros;
  unwantedProductIds: EntityId[];
  conditionIds: EntityId[];
  mealCategory: MealCategoryEnum;
  weightTarget: WeightTargetEnum;
}
