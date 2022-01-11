//Program powstał na Wydziale Informatyki Politechniki Białostockiej

import { EntityId } from "@reduxjs/toolkit";

export interface Product {
  id: EntityId;
  name: string;
  calories: number;
  fat: number;
  carbohydrates: number;
  sugar: number;
  fibre: number;
  protein: number;
  salt: number;
}
