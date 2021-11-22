import { EntityId } from "@reduxjs/toolkit";

export interface UserMedicalCondition {
    id?: EntityId,
    userId: EntityId,
    medicalConditionId: EntityId
};