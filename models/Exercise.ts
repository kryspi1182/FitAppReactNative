//Program powstał na Wydziale Informatyki Politechniki Białostockiej

import { EntityId } from "@reduxjs/toolkit";
import { ExerciseBodyTarget } from "./ExerciseBodyTarget";

export interface Exercise {
  id: EntityId;
  name: string;
  exerciseCategoryId: EntityId;
  difficultyId: EntityId;
  exerciseBodyTargets: Array<ExerciseBodyTarget>;
}
