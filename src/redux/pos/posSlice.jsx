import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import ProductService from "../../services/ProductService.jsx"
import UiStatus from "../../utils/classes/UiStatus.jsx"

const initialState = {
  products: {
    data: [],
    meta: {
      current_page: 0,
      last_page: 0,
      total: 0
    },
    status: UiStatus.LOADING,
    error: null
  }
}

const fetchProductsAsync = createAsyncThunk(
  "pos/fetchProductsAsync", 
  async (params=null, thunkAPI) => {
  try {
    const response = await ProductService.findAll(params)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

const posSlice = createSlice({
  name: "pos",
  initialState,
  reducers: {
    handleFilterChange: (state, action) => {
      state.filter = action.payload 
    },
    handlePaginationChange: (state, action) => {
      state.pagination = action.payload 
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchProductsAsync.pending, (state) => {
        state.products.status = UiStatus.LOADING
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        const { data, meta } = action.payload

        state.products.status = data.length > 0 ? UiStatus.SUCCESS : UiStatus.EMPTY
        state.products.data = data
        state.products.meta = {...meta}
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.products.status = UiStatus.ERROR
        state.products.error = action.payload
      })
  }
})

export const { handleFilterChange, handlePaginationChange } = posSlice.actions
export { fetchProductsAsync }
export default posSlice.reducer