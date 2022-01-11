//Program powstał na Wydziale Informatyki Politechniki Białostockiej

import { EntityId } from "@reduxjs/toolkit";
import { Meal } from "./Meal";

export interface UserSavedDietMeal {
  id: EntityId;
  userSavedDietId: EntityId;
  mealId: EntityId;
  meal: Meal;
}
