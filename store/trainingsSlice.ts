//Program powstał na Wydziale Informatyki Politechniki Białostockiej

import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityId,
  createDraftSafeSelector,
} from "@reduxjs/toolkit";
import { RootState } from "./configureStore";
import { PayloadAction } from "@reduxjs/toolkit/src";
import { trainingApi } from "../components/api_communication/TrainingApi";
import { Training } from "../models/Training";

const trainingsAdapter = createEntityAdapter<Training>();

export const fetchTrainings = createAsyncThunk("training/all", async () => {
  try {
    return await trainingApi.getTrainings();
  } catch (e) {
    return e.json();
  }
});

export const { selectAll: selectAllTrainings, selectById: selectTraningById } =
  trainingsAdapter.getSelectors((state: RootState) => state.trainings);

const trainingsSlice = createSlice({
  name: "trainings",
  initialState: trainingsAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchTrainings.fulfilled,
      (state, action: PayloadAction<Array<Training>>) => {
        if (action.payload) trainingsAdapter.upsertMany(state, action);
      }
    );
  },
});

export default trainingsSlice.reducer;
