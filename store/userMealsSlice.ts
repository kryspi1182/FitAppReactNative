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

const userMealsAdapter = createEntityAdapter<Meal>();

export const fetchMatchingMeals = createAsyncThunk(
  "meal/match",
  async (params: UserDietParams) => {
    try {
      return await dietApi.getMatchingMeals(params);
    } catch (e) {
      return e.json();
    }
  }
);

export const resetMeals = createAsyncThunk("meal/reset", async () => {});

export const { selectAll: selectAllUserMeals, selectById: selectUserMealById } =
  userMealsAdapter.getSelectors((state: RootState) => state.userMeals);

const userMealsSlice = createSlice({
  name: "userMeals",
  initialState: userMealsAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchMatchingMeals.fulfilled,
        (state, action: PayloadAction<Array<Meal>>) => {
          if (action.payload) {
            userMealsAdapter.upsertMany(state, action);
          }
        }
      )
      .addCase(resetMeals.fulfilled, (state, action) => {
        userMealsAdapter.removeAll(state);
      });
  },
});

export default userMealsSlice.reducer;
