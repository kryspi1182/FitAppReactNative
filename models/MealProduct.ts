//Program powstał na Wydziale Informatyki Politechniki Białostockiej

import { EntityId } from "@reduxjs/toolkit";

export interface MealProduct {
  id: EntityId;
  mealId: EntityId;
  productId: EntityId;
  quantity: number;
}
