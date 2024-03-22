import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import UiStatus from "../../utils/classes/UiStatus.jsx"
import ProductService from "../../services/ProductService.jsx"

const fetchProductsAsync = createAsyncThunk(
  "inventory/fetchProductsAsync", 
  async (params=null, thunkAPI) => {
  try {
    const response = await ProductService.findAll(params)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})
const createProductAsync = createAsyncThunk(
  "inventory/createProductAsync", 
  async (product, thunkAPI) => {
    try {
        const response = await ProductService.create(product)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})
const removeProductAsync = createAsyncThunk(
  "inventory/removeProductAsync", 
  async (id, thunkAPI) => {
    try {
        const response = await ProductService.remove(id)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})
const updateProductAsync = createAsyncThunk(
  "inventory/updateProductAsync", 
  async (product, thunkAPI) => {
    try {
        const response = await ProductService.update(product)
        return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
})

// state
const initialState = {
  fetchProductsApi: {
    status: UiStatus.LOADING,
    data: [],
    meta: {
      current_page: 0,
      last_page: 0,
      total: 0
    },
    error: null
  },
  createProductApi: {
    status: UiStatus.IDLE,
    message: "",
    error: null
  },
  removeProductApi: {
    status: UiStatus.IDLE,
    message: "",
    error: null
  },
  updateProductApi: {
    status: UiStatus.IDLE,
    message: "",
    error: null
  }
}

// core
const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    resetErrors: (state) => {
      state.createProductApi.error = null
      state.removeProductApi.error = null
      state.updateProductApi.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchProductsAsync
      .addCase(fetchProductsAsync.pending, (state) => {
        state.fetchProductsApi.status = UiStatus.LOADING
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        const { data, meta } = action.payload

        state.fetchProductsApi.status = data.length > 0 ? UiStatus.SUCCESS : UiStatus.EMPTY
        state.fetchProductsApi.data = data
        state.fetchProductsApi.meta = meta
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.fetchProductsApi.status = UiStatus.ERROR
        state.fetchProductsApi.error = action.payload
      })
      // create
      .addCase(createProductAsync.pending, (state) => {
        state.createProductApi.status = UiStatus.LOADING
      })
      .addCase(createProductAsync.fulfilled, (state, action) =>  {
        state.createProductApi.status = UiStatus.SUCCESS
        state.createProductApi.message = action.payload
        state.createProductApi.error = null
        
        state.fetchProductsApi.status = UiStatus.LOADING // re-fetch products
      })
      .addCase(createProductAsync.rejected, (state, action) => {
        state.createProductApi.status = UiStatus.ERROR
        state.createProductApi.error = action.payload
      })
      // remove
      .addCase(removeProductAsync.pending, (state) => {
        state.removeProductApi.status = UiStatus.LOADING
      })
      .addCase(removeProductAsync.fulfilled, (state, action) => {
        state.removeProductApi.status = UiStatus.SUCCESS
        state.removeProductApi.message = action.payload

        state.fetchProductsApi.status = UiStatus.LOADING //re-fetch products
      })
      .addCase(removeProductAsync.rejected, (state, action) => {
        state.removeProductApi.status = UiStatus.ERROR
        state.removeProductApi.error = action.payload
      })
      //update
      .addCase(updateProductAsync.pending, (state) => {
        state.updateProductApi.status = UiStatus.LOADING
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.updateProductApi.status = UiStatus.SUCCESS
        state.updateProductApi.message = action.payload
        state.updateProductApi.error = null

        state.fetchProductsApi.status = UiStatus.LOADING
      })
      .addCase(updateProductAsync.rejected, (state, action) => {
        state.updateProductApi.status = UiStatus.ERROR
        state.updateProductApi.error = action.payload
      })
  }
})

export const { 
  resetErrors
} = inventorySlice.actions
export { fetchProductsAsync, createProductAsync, removeProductAsync, updateProductAsync }
export default inventorySlice.reducer