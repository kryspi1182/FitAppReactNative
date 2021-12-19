import { EntityId } from "@reduxjs/toolkit";

export interface TrainingExercise {
    id: EntityId,
    series: number,
    repsPerSeries: number,
    trainingId: EntityId,
    exerciseId: EntityId
};