import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { buildColResponse, buildResponse, rowsPerPages } from "../../util/Config.jsx"
import { first } from "lodash"
import OrderService from "../../data/services/OrderService.js"
import ModalType from "../../util/classes/ModalType.js"
import ResponseStatus from "../../util/classes/ResponseStatus.js"

const approveOrder = createAsyncThunk(
  "orders/approveOrder", 
  async (id, thunkAPI) => {
    try {
      const response = await OrderService.approve(id)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
})
const rejectOrder = createAsyncThunk(
  "orders/rejectOrder", 
  async (id, thunkAPI) => {
    try {
      const response = await OrderService.reject(id)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
})
const defaultState = {
  sq: { name: "", status: "", per_page: first(rowsPerPages), page: 1 },
  order: { reference_number: "" },
  fetchResponse: {
    isLoading: false,
    data: [], 
    meta: { current_page: 0, last_page: 0 },
    error:null
  },
  fetch: {
    response: buildColResponse()
  },
  approve: {
    isOpen: false,
    response: buildResponse()
  },
  reject: {
    isOpen: false,
    response: buildResponse()
  },
  resetStates: (state, action) => {}
}

const initialState = { ...defaultState }
const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setSq: (state, action) => {
      state.sq = action.payload
    },
    setOrder: (state, action) => {
      state.order = action.payload
    },
    openModal: (state, action) => {
      if (action.payload == ModalType.APPROVE) state.approve.isOpen = true
      if (action.payload == ModalType.REJECT) state.reject.isOpen = true
    },
    closeModal: (state, action) => {
      if (action.payload == ModalType.APPROVE) state.approve.isOpen = false
      if (action.payload == ModalType.REJECT) state.reject.isOpen = false
    },
    setPending: (state) => {
      state.fetch.response = buildColResponse(ResponseStatus.PENDING)
    },
    setFulfilled: (state, action) => {
      state.fetch.response = buildColResponse(ResponseStatus.FULFILLED, action.payload)
    },
    setRejected: (state, action) => {
      state.fetch.response = buildColResponse(ResponseStatus.REJECTED, action.payload)
    },
    resetStates: (state) => {
      state.approve = { ...defaultState.approve }
      state.reject = { ...defaultState.reject }
    }
  },
  extraReducers: (builder) => {
    builder
    // Approve Order
    .addCase(approveOrder.pending, (state) => {
      state.approve.response = buildResponse(ResponseStatus.PENDING)
    })
    .addCase(approveOrder.fulfilled, (state, action) => {
      state.approve.response = buildResponse(ResponseStatus.FULFILLED, action.payload)
    })
    .addCase(approveOrder.rejected, (state, action) => {
      state.approve.response = buildResponse(ResponseStatus.REJECTED, action.payload)
    })
    // Reject Order
    .addCase(rejectOrder.pending, (state) => {
      state.reject.response = buildResponse(ResponseStatus.PENDING)
    })
    .addCase(rejectOrder.fulfilled, (state, action) => {
      state.reject.response = buildResponse(ResponseStatus.FULFILLED, action.payload)
    })
    .addCase(rejectOrder.rejected, (state, action) => {
      state.reject.response = buildResponse(ResponseStatus.REJECTED, action.payload)
    })
  }
})

export { approveOrder, rejectOrder }
export const { setSq, setOrder, openModal, closeModal, setPending, setFulfilled, setRejected, resetStates } = ordersSlice.actions
export default ordersSlice.reducer