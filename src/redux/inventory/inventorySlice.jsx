import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import UiStatus from "../../utils/classes/UiStatus.jsx"
import ProductService from "../../services/ProductService.jsx"

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
/*const fetchProductsAsync = createAsyncThunk(
  "inventory/fetchProductsAsync", 
  async (params=null, thunkAPI) => {
  try {
    const response = await ProductService.findAll(params)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})*/
const searchProductsAsync = createAsyncThunk(
  "inventory/searchProductsAsync", 
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
  fetchProductsResponse: {
    status: UiStatus.LOADING,
    data: [],
    meta: {
      current_page: 0,
      last_page: 0,
      total: 0
    },
    error: null
  },
  productsResponse: {
    status: UiStatus.FETCHING,
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
        state.productsResponse.status = UiStatus.FETCHING
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        const { data, meta } = action.payload

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
        state.productsResponse.status = UiStatus.SEARCHING
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
        state.createProductApi.status = UiStatus.LOADING
      })
      .addCase(createProductAsync.fulfilled, (state, action) =>  {
        state.createProductApi.status = UiStatus.SUCCESS
        state.createProductApi.message = action.payload
        state.createProductApi.error = null

        state.productsResponse.status = UiStatus.FETCHING //re-fetch products
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

        state.productsResponse.status = UiStatus.FETCHING //re-fetch products
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

        state.productsResponse.status = UiStatus.FETCHING //re-fetch products
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
export { fetchProductsAsync, searchProductsAsync, createProductAsync, removeProductAsync, updateProductAsync }
export default inventorySlice.reducer