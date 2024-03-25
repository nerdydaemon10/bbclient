import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import UiStatus from "../../utils/classes/UiStatus.jsx"
import OrderService from "../../services/OrderService.jsx"
import ProductService from "../../services/ProductService.jsx"

const initialState = {
  fetchfetchProductsResponse: {
    status: UiStatus.LOADING,
    data: [],
    meta: {
      current_page: 0,
      last_page: 0,
      total: 0
    },
    error: null
  },
  createOrderResponse: {
    status: UiStatus.IDLE,
    message: "",
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

const createOrderAsync = createAsyncThunk(
  "pos/createOrderAsync", 
  async (order, thunkAPI) => {
  try {
    const response = await OrderService.create(order)
    return response.data
  } catch (error) {
    console.log(error.response.data)
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

const buildCheckout = (product) => {
  const { id, category_id, name, description, srp, member_price } = product
  
  return {
    id: id, category_id: category_id,
    name: name, description: description,
    srp: srp, member_price: member_price,
    quantity: 1, total: srp
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
    },
    resetState: (state) => {
      state.createOrderResponse.status = UiStatus.IDLE
      state.createOrderResponse.message = ""
      state.createOrderResponse.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchProductsAsync
      .addCase(fetchProductsAsync.pending, (state) => {
        state.fetchfetchProductsResponse.status = UiStatus.LOADING
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        const { data, meta } = action.payload

        state.fetchfetchProductsResponse.status = data.length > 0 ? UiStatus.SUCCESS : UiStatus.EMPTY
        state.fetchfetchProductsResponse.data = data
        state.fetchfetchProductsResponse.meta = meta
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.fetchfetchProductsResponse.status = UiStatus.ERROR
        state.fetchfetchProductsResponse.error = action.payload
      })
      // createOrderAsync
      .addCase(createOrderAsync.pending, (state) => {
        state.createOrderResponse.status = UiStatus.LOADING
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.createOrderResponse.status = UiStatus.SUCCESS
        state.createOrderResponse.message = action.payload
      })
      .addCase(createOrderAsync.rejected, (state, action) => {
        state.createOrderResponse.status = UiStatus.ERROR
        state.createOrderResponse.error = action.payload
      })
  }
})

export const {
  checkoutProduct,
  incrementQty,
  decrementQty,
  resetState
} = posSlice.actions
export { fetchProductsAsync, createOrderAsync }
export default posSlice.reducer