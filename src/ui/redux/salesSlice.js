import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { buildColResponse, buildResponse, rowsPerPages } from "../../util/Config.jsx"
import { first } from "lodash"
import { SaleService } from "../../data/services"
import ResponseStatus from "../../util/classes/ResponseStatus.js"

const exportAsExcel = createAsyncThunk(
  "sales/exportAsExcel", 
  async (sq, thunkAPI) => {
  try {
    const response = await SaleService.exportAsExcel(sq)
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
  fetch: { response: buildColResponse() },
  exportAsExcelResponse: buildResponse()
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
      state.fetch.response = buildColResponse(ResponseStatus.PENDING)
    },
    setFulfilled: (state, action) => {
      state.fetch.response = buildColResponse(ResponseStatus.FULFILLED, action.payload)
    },
    setRejected: (state, action) => {
      state.fetch.response = buildColResponse(ResponseStatus.REJECTED, action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
    // Export to excel
    .addCase(exportAsExcel.pending, (state) => {
      state.exportAsExcelResponse = buildResponse(ResponseStatus.PENDING)
    })
    .addCase(exportAsExcel.fulfilled, (state, action) => {
      state.exportAsExcelResponse = buildResponse(ResponseStatus.FULFILLED, action.payload)
    })
    .addCase(exportAsExcel.rejected, (state, action) => {
      state.exportAsExcelResponse = buildResponse(ResponseStatus.REJECTED, action.payload)
    })
  }
})

export const { 
  setSq,
  setPending,
  setFulfilled,
  setRejected
} = salesSlice.actions
export { exportAsExcel }
export default salesSlice.reducer