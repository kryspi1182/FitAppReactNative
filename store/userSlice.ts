import { createAsyncThunk, createEntityAdapter, createSlice, EntityId } from '@reduxjs/toolkit';
import { RootState } from './configureStore';
import { User } from '../models/User';
import { PayloadAction } from '@reduxjs/toolkit/src';
import { userApi } from '../components/api_communication/UserApi';
import { UserParams } from '../models/UserParams';

const initialState: User = {
    id: "0",
    userName: "test",
    email: "test@mail.com",
    height: 1,
    weight: 1,
    activity: 1,
    age: 20,
    gender: 1
};

export const fetchUser = createAsyncThunk('user/fetchUser', async (id: string) => {
    try {
        return await userApi.getUser(id);
    }
    catch (e) {
        return e.json();
    }
});

export const updateUser = createAsyncThunk('user/updateUser', async (params: UserParams, thunkAPI) => {
    try {
        const state = thunkAPI.getState() as RootState;
        return await userApi.updateUser(state.user.id, params);
    }
    catch (e) {
        return e.json();
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
            if (action.payload) {
                state.id = action.payload.id;
                state.email = action.payload.email;
                state.userName = action.payload.userName;
                state.activity = action.payload.activity;
                state.age = action.payload.age;
                state.gender = action.payload.gender;
                state.height = action.payload.height;
                state.weight = action.payload.weight;
                state.medicalConditions = action.payload.medicalConditions;
                state.unwantedProducts = action.payload.unwantedProducts;
            }
        }).addCase(updateUser.fulfilled, (state, action: PayloadAction<UserParams>) => {
            if (action.payload) {
                state.activity = action.payload.activity;
                state.age = action.payload.age;
                state.gender = action.payload.gender;
                state.height = action.payload.height;
                state.weight = action.payload.weight;
                state.medicalConditions = action.payload.medicalConditions;
                state.unwantedProducts = action.payload.unwantedProducts;
            }
        });
    }
});

export default userSlice.reducer;

export const selectUser = (state: RootState) => state.user;