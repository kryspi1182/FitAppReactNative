import { EntityId } from "@reduxjs/toolkit";

export interface TrainingCondition {
    id: EntityId,
    bodyTargetId: EntityId,
    trainingConditionSeverityId: EntityId
};