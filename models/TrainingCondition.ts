//Program powstał na Wydziale Informatyki Politechniki Białostockiej

import { EntityId } from "@reduxjs/toolkit";

export interface TrainingCondition {
  id: EntityId;
  bodyTargetId: EntityId;
  trainingConditionSeverityId: EntityId;
}
