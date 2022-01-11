//Program powstał na Wydziale Informatyki Politechniki Białostockiej

import { EntityId } from "@reduxjs/toolkit";

export interface ExerciseBodyTarget {
  id: EntityId;
  exerciseId: EntityId;
  bodyTargetId: EntityId;
}
