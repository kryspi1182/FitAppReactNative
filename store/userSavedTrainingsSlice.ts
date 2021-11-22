import { createAsyncThunk, createEntityAdapter, createSlice, EntityId, createDraftSafeSelector } from '@reduxjs/toolkit';
import { RootState } from './configureStore';
import { PayloadAction } from '@reduxjs/toolkit/src';
import { UserSavedTraining } from '../models/UserSavedTraining';
import { userApi } from '../components/api_communication/UserApi';
import { UserSavedTrainingParams } from '../models/UserSavedTrainingParams';

const userSavedTrainingAdapter = createEntityAdapter<UserSavedTraining>();

export const fetchUserSavedTrainings = createAsyncThunk('userSavedTrainings/get', async (id: EntityId) => {
    try {
        return await userApi.getUserSavedTrainings(id);
    }
    catch (e) {
        return e.json();
    }
});

export const addUserSavedTraining = createAsyncThunk('userSavedTrainings/add', async (params: UserSavedTrainingParams) => {
    try {
        return await userApi.addUserSavedTraining(params);
    }
    catch (e) {
        return e.json();
    }
});

export const {
    selectAll: selectAllUserSavedTrainings,
    selectById: selectUserSavedTrainingById,
} = userSavedTrainingAdapter.getSelectors((state: RootState) => state.userSavedTrainings);

const userSavedTrainingsSlice = createSlice({
    name: 'userSavedTrainings',
    initialState: userSavedTrainingAdapter.getInitialState(),
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchUserSavedTrainings.fulfilled, (state, action: PayloadAction<Array<UserSavedTraining>>) => {
            //console.log(action.payload);
            if (action.payload)
                userSavedTrainingAdapter.upsertMany(state, action);
        }).addCase(addUserSavedTraining.fulfilled, (state, action: PayloadAction<UserSavedTraining>) => {
            if (action.payload) {
                userSavedTrainingAdapter.upsertOne(state, action);
            }
        })
    }
});

export default userSavedTrainingsSlice.reducer;