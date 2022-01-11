//Program powstał na Wydziale Informatyki Politechniki Białostockiej

import { EntityId } from "@reduxjs/toolkit";

export interface UserSavedTrainingParams {
  userId: EntityId;
  trainingId: EntityId;
}
