import { EntityId } from "@reduxjs/toolkit";

export interface User {
    id: string,
    userName: string,
    email: string,
    activity: number,
    age: number,
    gender: number,
    height: number,
    weight: number
};