//Program powstał na Wydziale Informatyki Politechniki Białostockiej

import { EntityId } from "@reduxjs/toolkit";
import { TrainingExercise } from "./TrainingExercise";

export interface Training {
  id: EntityId;
  name: string;
  description: string;
  trainingCategoryId: EntityId;
  difficultyId: EntityId;
  trainingExercises: Array<TrainingExercise>;
}
