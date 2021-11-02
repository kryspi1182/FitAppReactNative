import { EntityId } from "@reduxjs/toolkit";

export interface UserSavedDietParams {
    userId: EntityId,
    name: string,
    mealIds: Array<EntityId>
};