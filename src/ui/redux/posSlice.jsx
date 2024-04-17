import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { tabs } from "../home/pos/Util.jsx"
import OrderService from "../../data/services/OrderService.jsx"
import { paymentMethods, rowsPerPages } from "../../utils/Config.jsx"
import { first } from "lodash"
import TableType from "../../utils/classes/TableType.jsx"
import FetchType from "../../utils/classes/FetchType.jsx"

const createOrder = createAsyncThunk(
  "pos/createOrder", 
  async (order, thunkAPI) => {
  try {
    const response = await OrderService.create(order)
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

const buildCheckout = (product) => {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    srp: product.srp,
    stocks: product.quantity,
    quantity: 1
  }
}

const defaultState = {
  products: {
    searchQuery: {
      name: "", 
      category_id: "", 
      per_page: rowsPerPages[0].id, 
      page: 1
    },
    fetchResponse: {
      isLoading: true, 
      data: [], 
      meta: { current_page: 0, last_page: 0 },
      error: null
    }
  },
  customers: {
    searchQuery: {
      full_name: "", 
      category_id: "", 
      per_page: rowsPerPages[0].id, 
      page: 1
    },
    fetchResponse: {
      isLoading: true, 
      data: [], 
      meta: { current_page: 0, last_page: 0 },
      error: null
    }
  },
  createOrderResponse: {
    isLoading: false, 
    isSuccess: false, 
    data: null, 
    error: null 
  },
  paymentMethod: first(paymentMethods).value,
  customer: null,
  table: TableType.PRODUCTS,
  tab: first(tabs).value,
  checkouts: []
}

const initialState = { ...defaultState }

const posSlice = createSlice({
  name: "pos",
  initialState,
  reducers: {
    resetStates: (state) => {
      state.checkouts = [],
      //state.paymentMethod = first(paymentMethods).value,
      /*state.tab = first(tabs).value*/
      //state.table = TableType.PRODUCTS
      state.customer = null,
      state.createOrderResponse = { ...defaultState.createOrderResponse }
    },
    setSearchQuery: (state, action) => {
      if (state.table == TableType.PRODUCTS) {
        state.products.searchQuery = action.payload
      } else {
        state.customers.searchQuery = action.payload
      }
    },
    setFetchResponse: (state, action) => {
      const { type, ...fetchResponse } = action.payload

      if (type == FetchType.PRODUCTS) {
        state.products.fetchResponse = fetchResponse
      }
      if (type == FetchType.CUSTOMERS) {
        state.customers.fetchResponse = fetchResponse
      }
    },
    addToCheckout: (state, action) => {
      state.checkouts.push(buildCheckout(action.payload))
    },
    decrementQty: (state, action) => {
      state.checkouts = state.checkouts.map(checkout => {
        if (checkout.id != action.payload) return checkout
        if (checkout.quantity > 0) checkout.quantity = checkout.quantity - 1
        return checkout
      }).filter(checkout => checkout.quantity > 0)
    },
    incrementQty: (state, action) => {
      state.checkouts = state.checkouts.map(checkout => {
        if (checkout.id != action.payload) return checkout
        if (checkout.quantity < checkout.stocks) checkout.quantity = checkout.quantity + 1
        return checkout
      })
    },
    toggleTable: (state) => {
      state.table = state.table == TableType.PRODUCTS 
        ? TableType.CUSTOMERS 
        : TableType.PRODUCTS
    },
    setTab: (state, action) => {
      state.tab = action.payload
    },
    setCustomer: (state, action) => {
      state.customer = action.payload
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
    // create
    .addCase(createOrder.pending, (state) => {
      state.createOrderResponse = {
        isLoading: true,
        isSuccess: false,
        data: null,
        error: null
      }
    })
    .addCase(createOrder.fulfilled, (state, action) => {
      state.createOrderResponse = {
        isLoading: false,
        isSuccess: true,
        data: action.payload,
        error: null
      }
    })
    .addCase(createOrder.rejected, (state, action) => {
      state.createOrderResponse = {
        isLoading: false,
        isSuccess: false,
        data: null,
        error: action.payload
      }
    })
  }
})

export const {
  setSearchQuery,
  setFetchResponse,
  addToCheckout,
  incrementQty,
  decrementQty,
  toggleTable,
  setTab,
  setCustomer,
  setPaymentMethod,
  resetStates
} = posSlice.actions
export { createOrder }
export default posSlice.reducer