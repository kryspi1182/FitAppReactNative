import { createAsyncThunk, createEntityAdapter, createSlice, EntityId, createDraftSafeSelector } from '@reduxjs/toolkit';
import { RootState } from './configureStore';
import { Product } from '../models/Product';
import { PayloadAction } from '@reduxjs/toolkit/src';
import { authorizeSrv } from '../components/api_authorization/AuthorizeSrv';
import { dietApi } from '../components/api_communication/DietApi';
import { UserParams } from '../models/UserParams';
import { Macros } from '../models/Macros';

const productsAdapter = createEntityAdapter<Product>();

export const fetchProducts = createAsyncThunk('products', async () => {
    try {
        return await dietApi.getProducts();
    }
    catch (e) {
        return e.json();
    }
});

export const {
    selectAll: selectAllProducts,
    selectById: selectProductById,
} = productsAdapter.getSelectors((state: RootState) => state.products);

const productsSlice = createSlice({
    name: 'products',
    initialState: productsAdapter.getInitialState(),
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Array<Product>>) => {
            if(action.payload) {
                //console.log(action.payload);
                productsAdapter.upsertMany(state, action);
            }
                
        })
    }
});

export default productsSlice.reducer;