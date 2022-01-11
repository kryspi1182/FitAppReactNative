//Program powstał na Wydziale Informatyki Politechniki Białostockiej

import { EntityId } from "@reduxjs/toolkit";
import { UserMedicalCondition } from "./UserMedicalCondition";
import { UserTrainingCondition } from "./UserTrainingCondition";
import { UserUnwantedProduct } from "./UserUnwantedProduct";

export interface User {
  id: string;
  userName: string;
  email: string;
  activity: number;
  age: number;
  gender: number;
  height: number;
  weight: number;
  difficultyId: number;
  weightTargetId: number;
  medicalConditions: UserMedicalCondition[];
  unwantedProducts: UserUnwantedProduct[];
  trainingConditions: UserTrainingCondition[];
}
