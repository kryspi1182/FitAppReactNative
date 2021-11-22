import { EntityId } from "@reduxjs/toolkit";

export interface ExerciseCategory {
    id: EntityId,
    name: string,
    description: string
};