import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import UiStatus from "../../utils/classes/UiStatus.jsx"
import ProductService from "../../services/ProductService.jsx"

// state
const initialState = {
  findAll: {
    status: UiStatus.LOADING,
    error: null,
    products: []
  },
  create: {
    status: UiStatus.IDLE,
    error: null,
    message: ""
  },
  update: {
    status: UiStatus.IDLE,
    error: null,
    message: ""
  },
  remove: {
    status: UiStatus.IDLE,
    error: null,
    message: ""
  }
}

// async functions
const findAllProducts = createAsyncThunk(
  "inventory/findAllProducts", 
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
        return response
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})
const updateProduct = createAsyncThunk(
  "inventory/updateProduct", 
  async (product, thunkAPI) => {
    try {
        const response = await ProductService.update(product)
        return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
})
const removeProduct = createAsyncThunk(
  "inventory/removeProduct", 
  async (product, thunkAPI) => {
    try {
        const response = await ProductService.remove(product.id)
        return response
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

// core
const productsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      // findAll product
      .addCase(findAllProducts.pending, (state) => { state.findAll.status = UiStatus.LOADING })
      .addCase(findAllProducts.fulfilled, (state, action) => {
        state.findAll.status = action.payload.length > 0 ? UiStatus.IDLE : UiStatus.EMPTY
        state.findAll.products = action.payload
      })
      .addCase(findAllProducts.rejected, (state, action) => {
        state.findAll.status = UiStatus.ERROR
        state.findAll.error = action.payload
      })
      // create product
      .addCase(createProduct.pending, (state) => {
        state.create.status = UiStatus.LOADING
      })
      .addCase(createProduct.fulfilled, (state, action) =>  {
        state.create.status = UiStatus.SUCCESS
        state.create.message = action.payload

        state.findAll.status = UiStatus.LOADING // re-findAll products
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.create.status = UiStatus.ERROR
        state.create.error = action.payload
      })
      // update product
      .addCase(updateProduct.pending, (state) => {
        state.update.status = UiStatus.LOADING
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.update.status = UiStatus.SUCCESS
        state.update.message = action.payload

        state.findAll.status = UiStatus.LOADING

        state.create.status = UiStatus.IDLE
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.update.status = UiStatus.ERROR
        state.update.error = action.payload
      })
      // remove product
      .addCase(removeProduct.pending, (state) => {
        state.remove.status = UiStatus.LOADING
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.product = null // remove temp product

        state.remove.status = UiStatus.SUCCESS
        state.remove.message = action.payload

        state.findAll.status = UiStatus.LOADING //re-findAll products
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.remove.status = UiStatus.ERROR
        state.remove.error = action.payload
      })
  }
})

export { findAllProducts, createProduct, updateProduct, removeProduct }
export default productsSlice.reducer