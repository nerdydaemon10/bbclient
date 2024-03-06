import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import ProductService from "../../services/ProductService.jsx"
import UiStatus from "../../utils/classes/UiStatus.jsx"
import DateHelper from "../../utils/helpers/DateHelper.jsx"
import StringHelper from "../../utils/helpers/StringHelper.jsx"
import ProductCategories from "../../utils/data/ProductCategories.jsx"

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
        return response.data
    } catch (error) {
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
        state.fetch.products = action.payload.map((item) => {
          return {
            ...item,
            name: StringHelper.truncate(item.name),
            category: ProductCategories.find((category) => category.id == item.id).name,
            description: StringHelper.truncate(item.name),
            created_at: DateHelper.display(item.created_at),
            updated_at: DateHelper.display(item.updated_at)
          }
        })
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