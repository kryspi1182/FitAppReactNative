import { EntityId } from "@reduxjs/toolkit";

export interface MedicalCondition {
    id: EntityId,
    name: string,
    description: string
};