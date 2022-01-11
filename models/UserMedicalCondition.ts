//Program powstał na Wydziale Informatyki Politechniki Białostockiej

import { EntityId } from "@reduxjs/toolkit";

export interface UserMedicalCondition {
  id?: EntityId;
  userId: EntityId;
  medicalConditionId: EntityId;
}
