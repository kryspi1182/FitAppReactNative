//Program powstał na Wydziale Informatyki Politechniki Białostockiej

import { EntityId } from "@reduxjs/toolkit";

export interface DietMeals {
  breakfasts: EntityId[];
  secondBreakfasts: EntityId[];
  lunches: EntityId[];
  snacks: EntityId[];
  dinners: EntityId[];
}
