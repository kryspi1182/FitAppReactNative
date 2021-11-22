import { EntityId } from "@reduxjs/toolkit";

export interface ExerciseBodyTarget {
    id: EntityId,
    exerciseId: EntityId,
    bodyTargetId: EntityId
};