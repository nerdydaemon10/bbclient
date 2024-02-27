import axios from "axios";
import { callApi } from "../../utils/helpers/api/callApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchInventoryItems = createAsyncThunk("inventory/getItems", async () =>{
    try {
        const response = await callApi('get', '/products')
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


const inventorySlice = createSlice({
    name: 'products',
    initialState,
    reducers:{
        addProducts: (state, action) => {
            state.products = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
    .addCase(fetchInventoryItems.pending, (state) => {
        state.loading = true
        state.status = "pending"
    }) 
    .addCase(fetchInventoryItems.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload;
        state.loading = false
    })
    .addCase(fetchInventoryItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
    })
    }
})

const { addProducts } = inventorySlice.actions

export const selectAllProducts = (state) => state.products.products;

export default inventorySlice.reducer;