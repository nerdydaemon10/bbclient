import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import ProductService from "../../services/ProductService.jsx"
import UiStatus from "../../utils/classes/UiStatus.jsx"

// state
const initialState = {
  fetch: {
    products: [],
    status: UiStatus.LOADING,
    error: null
  },
  create: {
    status: UiStatus.IDLE,
    error: null
  }
}

// async functions
const fetchProducts = createAsyncThunk(
  "inventory/fetchProducts", 
  async (thunkAPI) => {
  try {
    const response = await ProductService.findAll()
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})
const createProduct = createAsyncThunk(
  "inventory/createProduct", 
  async (product, thunkAPI) => {
    try {
        const response = await ProductService.create(product)
        console.log(response)
        return response.data
    } catch (error) {
        console.log(error)
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

// core
const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchProducts.pending, (state) => {
        state.fetch.status = UiStatus.LOADING
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.fetch.status = action.payload.length > 0 ? UiStatus.IDLE : UiStatus.EMPTY
        state.fetch.products = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.fetch.status = UiStatus.ERROR
        state.fetch.error = action.payload
      })
      // create
      .addCase(createProduct.pending, (state) => {
        state.create.status = UiStatus.LOADING
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.create.status = UiStatus.SUCCESS
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.create.status = UiStatus.ERROR
        state.create.error = action.payload
      })
  }
})

export { fetchProducts, createProduct }
export default inventorySlice.reducer