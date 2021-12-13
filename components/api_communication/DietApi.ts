import * as connection from './ApiConnection';
import { Macros } from '../../models/Macros';
import { UserParams } from '../../models/UserParams';
import { UserDietParams } from '../../models/UserDietParams';
import { Meal } from '../../models/Meal';
import { Product } from '../../models/Product';
import { AxiosResponse } from 'axios';

export const dietApi = {
    async getMacros(userParams: UserParams) {
        try {
            var test = connection.api.get<Macros>(`diet/macros/count`).then(response => response.data)
            return await connection.api.post<UserParams, AxiosResponse<Macros>>(`diet/macros/count`, userParams)
                .then(response => response.data);
        }
        catch (e) {
            console.log("error w dietApi " + e);
        }
    },
    async getMatchingMeals(params: UserDietParams) {
        try {
            return await connection.api.post<UserDietParams, AxiosResponse<Array<Meal>>>(`diet/meals/match`, params)
                .then(response => response.data);
        }
        catch (e) {
            console.log("error w dietApi " + e);
        }
    },
    async getProducts() {
        try {
            return await connection.api.get<Array<Product>>(`diet/products/get`)
                .then(response => response.data);
        }
        catch (e) {
            console.log("error w dietApi " + e);
        }
    },
    async getMeals() {
        try {
            return await connection.api.get<Array<Meal>>(`diet/meals/get`)
                .then(response => response.data);
        }
        catch (e) {
            console.log("error w dietApi " + e);
        }
    }
};