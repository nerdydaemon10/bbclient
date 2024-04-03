import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import UiStatus from "../../../utils/classes/UiStatus.jsx"
import ProductService from "../../../data/services/ProductService.jsx"
import { rowsPerPages } from "../../../utils/Configs.jsx"

const fetchProductsAsync = createAsyncThunk(
  "inventory/fetchProductsAsync", 
  async (thunkAPI) => {
  try {
    const response = await ProductService.findAll()
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})
const searchProductsAsync = createAsyncThunk(
  "inventory/searchProductsAsync", 
  async (query=null, thunkAPI) => {
  try {
    const response = await ProductService.findAll(query)
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

// states
const defaultState = {
  productsResponse: {
    isInitialize: false,
    status: UiStatus.IDLE,
    data: [],
    meta: {
      current_page: 0,
      last_page: 0,
      total: 0
    },
    error: null
  },
  createProductResponse: {
    status: UiStatus.IDLE,
    message: "",
    error: null
  },
  removeProductResponse: {
    status: UiStatus.IDLE,
    message: "",
    error: null
  },
  updateProductResponse: {
    status: UiStatus.IDLE,
    message: "",
    error: null
  },
  searchQuery: {
    name: "",
    category_id: "",
    per_page: rowsPerPages[0].id,
    page: 1
  }
}
const initialState = { ...defaultState }

// core
const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    cleanupStatesBeforeLeave: (state) => {
      state.createProductResponse = { ...defaultState.createProductResponse }
      state.updateProductResponse = { ...defaultState.updateProductResponse }
      state.removeProductResponse = { ...defaultState.removeProductResponse }
    },
    resetErrorsAndNotifications: (state) => {
      state.createProductResponse = { ...defaultState.createProductResponse }
      state.updateProductResponse = { ...defaultState.updateProductResponse }
      state.removeProductResponse = { ...defaultState.removeProductResponse }
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchProductsAsync
      .addCase(fetchProductsAsync.pending, (state) => {
        state.productsResponse.status = UiStatus.LOADING
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        const { data, meta } = action.payload

        state.productsResponse.isInitialize = true
        state.productsResponse.status = data.length > 0 ? UiStatus.SUCCESS : UiStatus.EMPTY
        state.productsResponse.data = data
        state.productsResponse.meta = meta
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.productsResponse.status = UiStatus.ERROR
        state.productsResponse.error = action.payload
      })
      // searchProductsAsync
      .addCase(searchProductsAsync.pending, (state) => {
        state.productsResponse.status = UiStatus.LOADING
      })
      .addCase(searchProductsAsync.fulfilled, (state, action) => {
        const { data, meta } = action.payload

        state.productsResponse.status = data.length > 0 ? UiStatus.SUCCESS : UiStatus.EMPTY 
        state.productsResponse.data = data
        state.productsResponse.meta = meta
      })
      .addCase(searchProductsAsync.rejected, (state, action) => {
        state.productsResponse.status = UiStatus.ERROR
        state.productsResponse.error = action.payload
      })
      // create
      .addCase(createProductAsync.pending, (state) => {
        state.createProductResponse.status = UiStatus.LOADING
      })
      .addCase(createProductAsync.fulfilled, (state, action) =>  {
        state.createProductResponse.status = UiStatus.SUCCESS
        state.createProductResponse.message = action.payload
        state.createProductResponse.error = null
      })
      .addCase(createProductAsync.rejected, (state, action) => {
        state.createProductResponse.status = UiStatus.ERROR
        state.createProductResponse.error = action.payload
      })
      // remove
      .addCase(removeProductAsync.pending, (state) => {
        state.removeProductResponse.status = UiStatus.LOADING
      })
      .addCase(removeProductAsync.fulfilled, (state, action) => {
        state.removeProductResponse.status = UiStatus.SUCCESS
        state.removeProductResponse.message = action.payload
      })
      .addCase(removeProductAsync.rejected, (state, action) => {
        state.removeProductResponse.status = UiStatus.ERROR
        state.removeProductResponse.error = action.payload
      })
      //update
      .addCase(updateProductAsync.pending, (state) => {
        state.updateProductResponse.status = UiStatus.LOADING
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.updateProductResponse.status = UiStatus.SUCCESS
        state.updateProductResponse.message = action.payload
        state.updateProductResponse.error = null
      })
      .addCase(updateProductAsync.rejected, (state, action) => {
        state.updateProductResponse.status = UiStatus.ERROR
        state.updateProductResponse.error = action.payload
      })
  }
})

export const { setSearchQuery, cleanupStatesBeforeLeave, resetErrorsAndNotifications } = inventorySlice.actions
export { fetchProductsAsync, searchProductsAsync, createProductAsync, removeProductAsync, updateProductAsync }
export default inventorySlice.reducer