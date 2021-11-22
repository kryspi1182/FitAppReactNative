import { EntityId } from "@reduxjs/toolkit";

export interface UserSavedTraining {
    id: EntityId,
    userId: EntityId,
    trainingId: EntityId
};