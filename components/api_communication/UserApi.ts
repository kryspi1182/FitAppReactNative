import * as connection from './ApiConnection';
import { User } from '../../models/User';
import { EntityId } from '@reduxjs/toolkit';
import { UserParams } from '../../models/UserParams';

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
    }
};