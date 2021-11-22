import { createAsyncThunk, createEntityAdapter, createSlice, EntityId, createDraftSafeSelector } from '@reduxjs/toolkit';
import { RootState } from './configureStore';
import { Meal } from '../models/Meal';
import { Product } from '../models/Product';
import { PayloadAction } from '@reduxjs/toolkit/src';
import { dietApi } from '../components/api_communication/DietApi';
import { UserParams } from '../models/UserParams';
import { Macros } from '../models/Macros';
import { UserDietParams } from '../models/UserDietParams';

const userMealsAdapter = createEntityAdapter<Meal>();

export const fetchBreakfast = createAsyncThunk('meal/breakfast', async (macros: Macros) => {
    try {
        return await dietApi.getMealsForBreakfast(macros);
    }
    catch (e) {
        return e.json();
    }
});

export const fetchLunch = createAsyncThunk('meal/lunch', async (macros: Macros) => {
    try {
        return await dietApi.getMealsForLunch(macros);
    }
    catch (e) {
        return e.json();
    }
});

export const fetchDinner = createAsyncThunk('meal/dinner', async (macros: Macros) => {
    try {
        return await dietApi.getMealsForDinner(macros);
    }
    catch (e) {
        return e.json();
    }
});

export const fetchSnack = createAsyncThunk('meal/snack', async (macros: Macros) => {
    try {
        return await dietApi.getMealsForSnack(macros);
    }
    catch (e) {
        return e.json();
    }
});

export const fetchMatchingMeals = createAsyncThunk('meal/match', async (params: UserDietParams) => {
    try {
        console.log(params);
        return await dietApi.getMatchingMeals(params);
    }
    catch (e) {
        return e.json();
    }
});

export const {
    selectAll: selectAllUserMeals,
    selectById: selectUserMealById,
} = userMealsAdapter.getSelectors((state: RootState) => state.userMeals);

const userMealsSlice = createSlice({
    name: 'userMeals',
    initialState: userMealsAdapter.getInitialState(),
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchBreakfast.fulfilled, (state, action: PayloadAction<Array<Meal>>) => {
            if (action.payload) {
                //console.log(action.payload);
                userMealsAdapter.upsertMany(state, action);
            }
                
        })
        .addCase(fetchLunch.fulfilled, (state, action: PayloadAction<Array<Meal>>) => {
            if (action.payload)
                userMealsAdapter.upsertMany(state, action);
        })
        .addCase(fetchDinner.fulfilled, (state, action: PayloadAction<Array<Meal>>) => {
            if (action.payload)
                userMealsAdapter.upsertMany(state, action);
        })
        .addCase(fetchSnack.fulfilled, (state, action: PayloadAction<Array<Meal>>) => {
            if (action.payload)
                userMealsAdapter.upsertMany(state, action);
        })
        .addCase(fetchMatchingMeals.fulfilled, (state, action: PayloadAction<Array<Meal>>) => {
            if (action.payload) {
                //console.log(action.payload);
                userMealsAdapter.upsertMany(state, action);
            }
                
        })
    }
});

export default userMealsSlice.reducer;