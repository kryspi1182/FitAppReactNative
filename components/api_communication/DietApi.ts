import * as connection from './ApiConnection';
import { Macros } from '../../models/Macros';
import { UserParams } from '../../models/UserParams';
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
    async getMealsForBreakfast(macros: Macros) {
        try {
            return await connection.api.post<Macros, AxiosResponse<Array<Meal>>>(`diet/meals/breakfast`, macros)
                .then(response => response.data);
        }
        catch (e) {
            console.log("error w dietApi " + e);
        }
    },
    async getMealsForLunch(macros: Macros) {
        try {
            return await connection.api.post<Macros, AxiosResponse<Array<Meal>>>(`diet/meals/lunch`, macros)
                .then(response => response.data);
        }
        catch (e) {
            console.log("error w dietApi " + e);
        }
    },
    async getMealsForDinner(macros: Macros) {
        try {
            return await connection.api.post<Macros, AxiosResponse<Array<Meal>>>(`diet/meals/dinner`, macros)
                .then(response => response.data);
        }
        catch (e) {
            console.log("error w dietApi " + e);
        }
    },
    async getMealsForSnack(macros: Macros) {
        try {
            return await connection.api.post<Macros, AxiosResponse<Array<Meal>>>(`diet/meals/snack`, macros)
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
    }
};