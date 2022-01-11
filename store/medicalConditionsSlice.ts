//Program powstał na Wydziale Informatyki Politechniki Białostockiej

import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityId,
  createDraftSafeSelector,
} from "@reduxjs/toolkit";
import { RootState } from "./configureStore";
import { Product } from "../models/Product";
import { PayloadAction } from "@reduxjs/toolkit/src";
import { userApi } from "../components/api_communication/UserApi";
import { UserParams } from "../models/UserParams";
import { Macros } from "../models/Macros";
import { MedicalCondition } from "../models/MedicalCondition";

const medicalConditionAdapter = createEntityAdapter<MedicalCondition>();

export const fetchMedicalConditions = createAsyncThunk(
  "medicalCondition",
  async () => {
    try {
      return await userApi.getMedicalConditions();
    } catch (e) {
      return e.json();
    }
  }
);

export const {
  selectAll: selectAllMedicalConditions,
  selectById: selectMedicalConditionById,
} = medicalConditionAdapter.getSelectors(
  (state: RootState) => state.medicalConditions
);

const medicalConditionSlice = createSlice({
  name: "medicalConditions",
  initialState: medicalConditionAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchMedicalConditions.fulfilled,
      (state, action: PayloadAction<Array<MedicalCondition>>) => {
        if (action.payload) medicalConditionAdapter.upsertMany(state, action);
      }
    );
  },
});

export default medicalConditionSlice.reducer;
