import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { buildColResponse, rowsPerPages } from "../../util/Config.jsx"
import { first } from "lodash"
import { SaleService } from "../../data/services"

const exportToExcel = createAsyncThunk(
  "sales/exportToExcel", 
  async (thunkAPI) => {
  try {
    const response = await SaleService.exportToExcel()
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

const defaultState = {
  sq: {
    "user.full_name": "",
    "customer.full_name": "",
    date_start: "",
    date_end: "",
    status: "",
    payment_method: "",
    per_page: first(rowsPerPages), 
    page: 1
  },
  fetch: {
    response: buildColResponse()
  },
  fetchSalesRes: {
    isLoading: false,
    data: [],
    meta: { current_page: 0, last_page: 0 },
    error: null
  },
  exportToExcelRes: {
    isLoading: false,
    isSuccess: false,
    error: null
  },
}
const initialState = { ...defaultState }

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    setSq: (state, action) => {
      state.sq = action.payload
    },
    setPending: (state) => {
      state.fetch.response = buildColResponse("pending")
    },
    setFulfilled: (state, action) => {
      state.fetch.response = buildColResponse("fulfilled", action.payload)
    },
    setRejected: (state, action) => {
      state.fetch.response = buildColResponse("rejected", action.payload)
    },
    setResLoading: (state) => {
      state.fetchSalesRes = {
        isLoading: true,
        data: [],
        meta: { current_page: 0, last_page: 0 },
        error: null
      }
    },
    setResSuccess: (state, action) => {
      state.fetchSalesRes = {
        isLoading: false,
        data: action.payload.data,
        meta: action.payload.meta,
        error: null
      }
    },
    setResError: (state, action) => {
      state.fetchSalesRes = {
        isLoading: false,
        data: [],
        meta: { current_page: 0, last_page: 0},
        error: action.payload
      }
    }
  },
  extraReducers: (builder) => {
    builder
    // Export to excel
    .addCase(exportToExcel.pending, (state) => {
      state.exportToExcelRes = {
        isLoading: true,
        isSuccess: false,
        error: null
      }
    })
    .addCase(exportToExcel.fulfilled, (state) => {
      state.exportToExcelRes = {
        isLoading: false,
        isSuccess: true,
        error: null
      }
    })
    .addCase(exportToExcel.rejected, (state, action) => {
      state.exportToExcelRes = {
        isLoading: false,
        isSuccess: false,
        error: action.payload
      }
    })
  }
})

export const { 
  setSq,
  setPending,
  setFulfilled,
  setRejected,
  setResLoading,
  setResSuccess,
  setResError
} = salesSlice.actions
export { exportToExcel }
export default salesSlice.reducer