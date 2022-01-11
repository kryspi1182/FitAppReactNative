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
import { Exercise } from "../models/Exercise";

const exercisesAdapter = createEntityAdapter<Exercise>();

export const fetchExercises = createAsyncThunk("exercises", async () => {
  try {
    return await trainingApi.getExercises();
  } catch (e) {
    return e.json();
  }
});

export const { selectAll: selectAllExercises, selectById: selectExerciseById } =
  exercisesAdapter.getSelectors((state: RootState) => state.exercises);

const exercisesSlice = createSlice({
  name: "exercises",
  initialState: exercisesAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchExercises.fulfilled,
      (state, action: PayloadAction<Array<Exercise>>) => {
        if (action.payload) {
          exercisesAdapter.upsertMany(state, action);
        }
      }
    );
  },
});

export default exercisesSlice.reducer;
