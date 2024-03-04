import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import ProductService from "../../services/ProductService.jsx"
import UiStatus from "../../utils/classes/UiStatus.jsx"

export const fetchProducts = createAsyncThunk("inventory/fetch-products", async (thunkAPI) => {
    try {
        const response = await ProductService.findAll()
        return response
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

const initialState = {
    products: [],
    status: UiStatus.LOADING,
    error: null
};


const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers:{
    addProducts: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchProducts.pending, (state) => {
        state.status = UiStatus.LOADING
    }) 
    .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = UiStatus.IDLE
        state.products = action.payload
    })
    .addCase(fetchProducts.rejected, (state, action) => {
        state.status = UiStatus.IDLE
        state.error = action.payload
    })
  }
})

const { addProducts } = inventorySlice.actions
//export const selectProducts = (state) => state.products
export default inventorySlice.reducer