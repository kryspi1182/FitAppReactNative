//Program powstał na Wydziale Informatyki Politechniki Białostockiej

import { EntityId } from "@reduxjs/toolkit";
import { MealProduct } from "./MealProduct";

export interface Meal {
  id: EntityId;
  name: string;
  description: string;
  recipe: string;
  mealCategoryId: number;
  mealProducts: Array<MealProduct>;
}
