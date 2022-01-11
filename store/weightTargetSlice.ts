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
import { userApi } from "../components/api_communication/UserApi";
import { WeightTarget } from "../models/WeightTarget";

const weightTargetAdapter = createEntityAdapter<WeightTarget>();

export const fetchWeightTargets = createAsyncThunk("WeightTarget", async () => {
  try {
    return await userApi.getWeightTargets();
  } catch (e) {
    return e.json();
  }
});

export const {
  selectAll: selectAllWeightTargets,
  selectById: selectWeightTargetById,
} = weightTargetAdapter.getSelectors((state: RootState) => state.weightTargets);

const weightTargetSlice = createSlice({
  name: "weightTargets",
  initialState: weightTargetAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchWeightTargets.fulfilled,
      (state, action: PayloadAction<Array<WeightTarget>>) => {
        if (action.payload) weightTargetAdapter.upsertMany(state, action);
      }
    );
  },
});

export default weightTargetSlice.reducer;
