import * as connection from './ApiConnection';
import { User } from '../../models/User';
import { EntityId } from '@reduxjs/toolkit';
import { UserParams } from '../../models/UserParams';
import { MedicalCondition } from '../../models/MedicalCondition';
import { UserSavedDietParams } from '../../models/UserSavedDietParams';
import { UserSavedDiet } from '../../models/UserSavedDiet';
import { AxiosResponse } from 'axios';
import { UserSavedTrainingParams } from '../../models/UserSavedTrainingParams';
import { UserSavedTraining } from '../../models/UserSavedTraining';

export const userApi = {
    async getUser(id: EntityId) {
        try {
            return await connection.api.get<User>(`user/getUser/${id}`)
                .then(response => response.data);
        }
        catch (e) {
            console.log("error w userApi " + e);
        }
    },
    async updateUser(id: EntityId, userParams: UserParams) {
        try {
            return await connection.api.put<UserParams>(`user/updateUser/${id}`, userParams)
                .then(response => response.data);
        }
        catch (e) {
            console.log("error w userApi " + e);
        }
    },
    async getMedicalConditions() {
        try {
            return await connection.api.get<Array<MedicalCondition>>(`user/medicalConditions`)
                .then(response => response.data);
        }
        catch (e) {
            console.log("error w userApi " + e);
        }
    },
    async addUserSavedDiet(params: UserSavedDietParams) {
        try {
            return await connection.api.post<UserSavedDietParams, AxiosResponse<UserSavedDiet>>(`user/userSavedDiet/add`, params)
                .then(response => response.data);
        }
        catch (e) {
            console.log("error w userApi " + e);
        }
    },
    async getUserSavedDiets(id: EntityId) {
        try {
            return await connection.api.get<Array<UserSavedDiet>>(`user/userSavedDiet/${id}`)
                .then(response => response.data);
        }
        catch (e) {
            console.log("error w userApi " + e);
        }
    },
    async addUserSavedTraining(params: UserSavedTrainingParams) {
        try {
            return await connection.api.post<UserSavedTrainingParams, AxiosResponse<UserSavedTraining>>(`user/userSavedTraining/add`, params)
                .then(response => response.data);
        }
        catch (e) {
            console.log("error w userApi " + e);
        }
    },
    async getUserSavedTrainings(id: EntityId) {
        try {
            return await connection.api.get<Array<UserSavedTraining>>(`user/userSavedTraining/${id}`)
                .then(response => response.data);
        }
        catch (e) {
            console.log("error w userApi " + e);
        }
    }
};