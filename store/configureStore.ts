import { configureStore } from '@reduxjs/toolkit';
import reduxThunk from 'redux-thunk';

import userReducer from './userSlice';
import productsReducer from './productsSlice';
import userMacrosReducer from './userMacrosSlice';
import userMealsReducer from './userMealsSlice';
import customMealsReducer from './customMealsSlice';
import medicalConditionsReducer from './medicalConditionsSlice';
import userSavedDietsReducer from './userSavedDietsSlice';
import mealsReducer from './mealsSlice';

const store = configureStore({
    // @ts-ignore
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }).
            prepend(
                reduxThunk
            ),
    reducer: {
        user: userReducer,
        products: productsReducer,
        userMacros: userMacrosReducer,
        userMeals: userMealsReducer,
        medicalConditions: medicalConditionsReducer,
        customMeals: customMealsReducer,
        userSavedDiets: userSavedDietsReducer,
        meals: mealsReducer
    },

});

export default store;

export type RootState = ReturnType<typeof store.getState>;