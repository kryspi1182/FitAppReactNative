import { createAsyncThunk, createEntityAdapter, createSlice, EntityId, createDraftSafeSelector } from '@reduxjs/toolkit';
import { RootState } from './configureStore';
import { Meal } from '../models/Meal';
import { Product } from '../models/Product';
import { PayloadAction } from '@reduxjs/toolkit/src';
import { dietApi } from '../components/api_communication/DietApi';
import { UserParams } from '../models/UserParams';
import { Macros } from '../models/Macros';
import { UserDietParams } from '../models/UserDietParams';

const customMealsAdapter = createEntityAdapter<Meal>();

export const fetchMatchingCustomMeals = createAsyncThunk('meal/match', async (params: UserDietParams) => {
    try {
        console.log(params);
        return await dietApi.getMatchingMeals(params);
    }
    catch (e) {
        return e.json();
    }
});

export const {
    selectAll: selectAllCustomMeals,
    selectById: selectCustomMealById,
} = customMealsAdapter.getSelectors((state: RootState) => state.customMeals);

const customMealsSlice = createSlice({
    name: 'customMeals',
    initialState: customMealsAdapter.getInitialState(),
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchMatchingCustomMeals.fulfilled, (state, action: PayloadAction<Array<Meal>>) => {
            if (action.payload)
                customMealsAdapter.upsertMany(state, action);
        })
    }
});

export default customMealsSlice.reducer;