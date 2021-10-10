import { configureStore } from '@reduxjs/toolkit';
import reduxThunk from 'redux-thunk';

import userReducer from './userSlice';
import productsReducer from './productsSlice';
import userMacrosReducer from './userMacrosSlice';
import userMealsReducer from './userMealsSlice';

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
        userMeals: userMealsReducer
    },

});

export default store;

export type RootState = ReturnType<typeof store.getState>;