import { createAsyncThunk, createEntityAdapter, createSlice, EntityId, createDraftSafeSelector } from '@reduxjs/toolkit';
import { RootState } from './configureStore';
import { Meal } from '../models/Meal';
import { Product } from '../models/Product';
import { PayloadAction } from '@reduxjs/toolkit/src';
import { dietApi } from '../components/api_communication/DietApi';
import { UserParams } from '../models/UserParams';
import { Macros } from '../models/Macros';
import { UserDietParams } from '../models/UserDietParams';

const mealsAdapter = createEntityAdapter<Meal>();

export const fetchMeals = createAsyncThunk('meal/all', async () => {
    try {
        return await dietApi.getMeals();
    }
    catch (e) {
        return e.json();
    }
});

export const {
    selectAll: selectAllMeals,
    selectById: selectMealById,
} = mealsAdapter.getSelectors((state: RootState) => state.meals);

const mealsSlice = createSlice({
    name: 'meals',
    initialState: mealsAdapter.getInitialState(),
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchMeals.fulfilled, (state, action: PayloadAction<Array<Meal>>) => {
            if (action.payload)
                mealsAdapter.upsertMany(state, action);
        })
    }
});

export default mealsSlice.reducer;