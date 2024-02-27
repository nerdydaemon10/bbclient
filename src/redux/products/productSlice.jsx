import axios from "axios";
import { callApi } from "../../utils/helpers/api/callApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk("products/getProducts", async () =>{
    try {
        const response = await callApi('get', '/products')
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log("Error fetching products", error);
    }
})

export const addProducts = createAsyncThunk("products/getProducts", async (data) =>{
    try {
        const response = await callApi('post', '/products', data)
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log("Error fetching products", error);
    }
})

const initialState = {
    products: [],
    status: "idle",
    loading: false,
    modal: false,
    error: null,
  };


const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers:{ },

    extraReducers: (builder) => {
    builder
        .addCase(fetchProducts.pending, (state) => {
            state.loading = true
            state.status = "pending"
        }) 
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = "success";
            state.products = action.payload;
            state.loading = false
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
    builder
        .addCase(addProducts.pending, (state) => {
            state.loading = true
            state.status = "pending"
        }) 
        .addCase(addProducts.fulfilled, (state, action) => {
            state.status = "success";
            state.products = action.payload;
            state.loading = false
        })
        .addCase(addProducts.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
    }
})

// const { addProducts } = productSlice.actions

export const selectAllProducts = (state) => state.products.products;

export default productSlice.reducer;