import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import UiStatus from "../../utils/classes/UiStatus.jsx"
import ProductService from "../../services/ProductService.jsx"

const initialState = {
  productsApi: {
    status: UiStatus.LOADING,
    data: [],
    meta: {
      current_page: 0,
      last_page: 0,
      total: 0
    },
    error: null
  },
  checkouts: [],
  total: 0.00
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

const buildCheckout = (product) => {
  return {
    ...product,
    quantity: 1,
    total: product.srp
  }
}
const updateCheckout = (checkouts, productId, accum) => {
  return checkouts.map((checkout) => {
    if (checkout.id != productId) {
      return checkout
    }
    if (checkout.quantity > 0) {
      checkout.quantity = checkout.quantity + accum
      checkout.total = checkout.srp * checkout.quantity
    }

    return checkout
  }).filter(checkout => checkout.quantity > 0)
}
const calculateTotal = (checkouts) => checkouts.reduce((accum, curr) => accum + (curr.srp * curr.quantity), 0.00)

const posSlice = createSlice({
  name: "pos",
  initialState,
  reducers: {
    checkoutProduct: (state, action) => {
      const checkout = buildCheckout(action.payload)

      state.checkouts.push(checkout)
      state.total = calculateTotal(state.checkouts)
    },
    decrementQty: (state, action) => {
      state.checkouts = updateCheckout(state.checkouts, action.payload, -1)
      state.total = calculateTotal(state.checkouts)
    },
    incrementQty: (state, action) => {
      state.checkouts = updateCheckout(state.checkouts, action.payload, 1)
      state.total = calculateTotal(state.checkouts)
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchProductsAsync
      .addCase(fetchProductsAsync.pending, (state) => {
        state.productsApi.status = UiStatus.LOADING
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        const { data, meta } = action.payload

        state.productsApi.status = data.length > 0 ? UiStatus.SUCCESS : UiStatus.EMPTY
        state.productsApi.data = data
        state.productsApi.meta = meta
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.productsApi.status = UiStatus.ERROR
        state.productsApi.error = action.payload
      })
  }
})

export const {
  checkoutProduct,
  incrementQty,
  decrementQty
} = posSlice.actions
export { fetchProductsAsync }
export default posSlice.reducer