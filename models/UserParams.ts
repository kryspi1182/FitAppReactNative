//Program powstał na Wydziale Informatyki Politechniki Białostockiej

import { UserMedicalCondition } from "./UserMedicalCondition";
import { UserTrainingCondition } from "./UserTrainingCondition";
import { UserUnwantedProduct } from "./UserUnwantedProduct";

export interface UserParams {
  activity: number;
  age: number;
  gender: number;
  height: number;
  weight: number;
  difficulty: number;
  weightTargetId: number;
  medicalConditions: UserMedicalCondition[];
  unwantedProducts: UserUnwantedProduct[];
  trainingConditions: UserTrainingCondition[];
}
