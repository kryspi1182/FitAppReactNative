import { EntityId } from "@reduxjs/toolkit";

export interface UserSavedTrainingParams {
    userId: EntityId,
    trainingId: EntityId
};