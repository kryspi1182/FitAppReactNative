//Program powstał na Wydziale Informatyki Politechniki Białostockiej

import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityId,
  createDraftSafeSelector,
} from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/src";
import { RootState } from "./configureStore";
import { trainingApi } from "../components/api_communication/TrainingApi";
import { TrainingCondition } from "../models/TrainingCondition";

const trainingConditionsAdapter = createEntityAdapter<TrainingCondition>();

export const fetchTrainingConditions = createAsyncThunk(
  "trainingConditions",
  async () => {
    try {
      return await trainingApi.getTrainingConditions();
    } catch (e) {
      return e.json();
    }
  }
);

export const {
  selectAll: selectAllTrainingConditions,
  selectById: selectTrainingConditionById,
} = trainingConditionsAdapter.getSelectors(
  (state: RootState) => state.trainingConditions
);

const trainingConditionsSlice = createSlice({
  name: "trainingConditions",
  initialState: trainingConditionsAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchTrainingConditions.fulfilled,
      (state, action: PayloadAction<Array<TrainingCondition>>) => {
        if (action.payload) {
          trainingConditionsAdapter.upsertMany(state, action);
        }
      }
    );
  },
});

export default trainingConditionsSlice.reducer;
