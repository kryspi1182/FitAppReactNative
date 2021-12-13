import { createAsyncThunk, createEntityAdapter, createSlice, EntityId, createDraftSafeSelector } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/src';
import { RootState } from './configureStore';
import { trainingApi } from '../components/api_communication/TrainingApi';
import { UserTrainingParams } from '../models/UserTrainingParams';
import { Training } from '../models/Training';

const userTrainingsAdapter = createEntityAdapter<Training>();

export const fetchMatchingTrainings = createAsyncThunk('training/match', async (params: UserTrainingParams) => {
    try {
        return await trainingApi.getMatchingTrainings(params);
    }
    catch (e) {
        return e.json();
    }
});

export const fetchMatchingTrainingsUserData = createAsyncThunk('training/match/user', async (params: UserTrainingParams) => {
    try {
        return await trainingApi.getMatchingTrainingsUserData(params);
    }
    catch (e) {
        return e.json();
    }
});

export const resetTrainings = createAsyncThunk('training/reset', async () => {

});

export const {
    selectAll: selectAllUserTrainings,
    selectById: selectUserTrainingById,
} = userTrainingsAdapter.getSelectors((state: RootState) => state.userTrainings);

const userTrainingsSlice = createSlice({
    name: 'userTrainings',
    initialState: userTrainingsAdapter.getInitialState(),
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchMatchingTrainings.fulfilled, (state, action: PayloadAction<Array<Training>>) => {
            //console.log(action.payload);
            if (action.payload) {
                userTrainingsAdapter.upsertMany(state, action);
            }
        })
        .addCase(fetchMatchingTrainingsUserData.fulfilled, (state, action: PayloadAction<Array<Training>>) => {
            //console.log(action.payload);
            if (action.payload) {
                userTrainingsAdapter.upsertMany(state, action);
            }
        })
        .addCase(resetTrainings.fulfilled, (state, action) => {
            userTrainingsAdapter.removeAll(state);
        })
    }
});

export default userTrainingsSlice.reducer;