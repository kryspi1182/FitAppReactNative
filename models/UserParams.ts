import { UserMedicalCondition } from "./UserMedicalCondition";
import { UserUnwantedProduct } from "./UserUnwantedProduct";

export interface UserParams {
    activity: number,
    age: number,
    gender: number,
    height: number,
    weight: number,
    medicalConditions: UserMedicalCondition[],
    unwantedProducts: UserUnwantedProduct[]
};