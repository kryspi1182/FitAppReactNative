import { EntityId } from "@reduxjs/toolkit";

export interface MealProduct {
    id: EntityId,
    mealId: EntityId,
    productId: EntityId,
    quantity: number
};