import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import UiStatus from "../../../utils/classes/UiStatus.jsx"
import { rowsPerPages } from "../../../utils/Configs.jsx"
import OrderService from "../../../data/services/OrderService.jsx"
import ProductService from "../../../data/services/ProductService.jsx"

const defaultState = {
  total: 0.00,
  checkouts: [],
  searchQuery: {
    name: "",
    category_id: "",
    per_page: rowsPerPages[0].id,
    page: 1
  },
  productsResponse: {
    isInitialize: false,
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
}

const initialState = { ...defaultState }

const fetchProductsAsync = createAsyncThunk(
  "pos/fetchProductsAsync", 
  async (thunkAPI) => {
  try {
    const response = await ProductService.findAll()
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})
const searchProductsAsync = createAsyncThunk(
  "pos/searchProductsAsync", 
  async (query=null, thunkAPI) => {
  try {
    const response = await ProductService.findAll(query)
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
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
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
    cleanupStatesBeforeLeave: (state) => {
      state.createOrderResponse = { ...defaultState.createOrderResponse }
    },
    cleanupSomeStates: (state) => {
      state.total = 0.00
      state.checkouts = []
      state.createOrderResponse = { ...defaultState.createOrderResponse }
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
  setSearchQuery,
  checkoutProduct,
  incrementQty,
  decrementQty,
  cleanupStatesBeforeLeave,
  cleanupSomeStates
} = posSlice.actions
export { fetchProductsAsync, searchProductsAsync, createOrderAsync }
export default posSlice.reducer