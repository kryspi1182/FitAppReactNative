//Program powstał na Wydziale Informatyki Politechniki Białostockiej

import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityId,
  createDraftSafeSelector,
} from "@reduxjs/toolkit";
import { RootState } from "./configureStore";
import { Meal } from "../models/Meal";
import { Product } from "../models/Product";
import { PayloadAction } from "@reduxjs/toolkit/src";
import { dietApi } from "../components/api_communication/DietApi";
import { UserParams } from "../models/UserParams";
import { Macros } from "../models/Macros";
import { UserDietParams } from "../models/UserDietParams";
import { UserSavedDiet } from "../models/UserSavedDiet";
import { userApi } from "../components/api_communication/UserApi";
import { UserSavedDietParams } from "../models/UserSavedDietParams";

const userSavedDietAdapter = createEntityAdapter<UserSavedDiet>();

export const fetchUserSavedDiets = createAsyncThunk(
  "userSavedDiets/get",
  async (id: EntityId) => {
    try {
      return await userApi.getUserSavedDiets(id);
    } catch (e) {
      return e.json();
    }
  }
);

export const addUserSavedDiet = createAsyncThunk(
  "userSavedDiets/add",
  async (params: UserSavedDietParams) => {
    try {
      return await userApi.addUserSavedDiet(params);
    } catch (e) {
      return e.json();
    }
  }
);

export const deleteUserSavedDiet = createAsyncThunk(
  "userSavedDiets/delete",
  async (id: EntityId) => {
    try {
      return await userApi.deleteUserSavedDiet(id);
    } catch (e) {
      return e.json();
    }
  }
);

export const {
  selectAll: selectAllUserSavedDiets,
  selectById: selectUserSavedDietById,
} = userSavedDietAdapter.getSelectors(
  (state: RootState) => state.userSavedDiets
);

const userSavedDietsSlice = createSlice({
  name: "userSavedDiets",
  initialState: userSavedDietAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchUserSavedDiets.fulfilled,
        (state, action: PayloadAction<Array<UserSavedDiet>>) => {
          if (action.payload) userSavedDietAdapter.upsertMany(state, action);
        }
      )
      .addCase(
        addUserSavedDiet.fulfilled,
        (state, action: PayloadAction<UserSavedDiet>) => {
          if (action.payload) {
            userSavedDietAdapter.upsertOne(state, action);
          }
        }
      )
      .addCase(
        deleteUserSavedDiet.fulfilled,
        (state, action: PayloadAction<UserSavedDiet>) => {
          if (action.payload) {
            userSavedDietAdapter.removeOne(state, action.payload.id);
          }
        }
      );
  },
});

export default userSavedDietsSlice.reducer;
