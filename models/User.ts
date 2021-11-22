import { EntityId } from "@reduxjs/toolkit";
import { UserMedicalCondition } from "./UserMedicalCondition";
import { UserUnwantedProduct } from "./UserUnwantedProduct";

export interface User {
    id: string,
    userName: string,
    email: string,
    activity: number,
    age: number,
    gender: number,
    height: number,
    weight: number,
    medicalConditions: UserMedicalCondition[],
    unwantedProducts: UserUnwantedProduct[]
};