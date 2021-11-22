import { EntityId } from "@reduxjs/toolkit";

export interface UserTrainingCondition {
    id: EntityId,
    userId: EntityId,
    trainingConditionId: EntityId
};