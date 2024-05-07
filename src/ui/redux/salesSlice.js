import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit"
import { buildColResponse, buildResponse, rowsPerPages } from "../../util/Config.jsx"
import { first, isEmpty } from "lodash"
import { SaleService } from "../../data/services"
import ResponseStatus from "../../util/classes/ResponseStatus.js"
import { computeSum, isEntitySelected } from "../../util/helper.jsx"

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
const fetchUsers = createAsyncThunk(
  "sales/fetchUsers", 
  async (thunkAPI) => {
  try {
    const response = []
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

const initialState = {
  salesSq: {
    employee_id: "",
    "customer.full_name": "",
    date_start: "",
    date_end: "",
    status: "",
    payment_method: "",
    per_page: first(rowsPerPages), 
    page: 1
  },
  sale: null,
  fetchSalesResponse: buildColResponse(),
  fetchUsersResponse: buildColResponse(),
  exportAsExcelResponse: buildResponse()
}

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    setSq: (state, action) => {
      state.salesSq = action.payload
      state.fetchSalesResponse.isLoaded = false
    },
    setSale: (state, action) => {
      const { sale } = state
      
      if (isEmpty(state.sale) || !isEntitySelected(sale, action.payload)) {
        state.sale = action.payload
      } else {
        state.sale = null
      }
    },
    setTab: (state, action) => {
      state.tab = action.payload
    },
    setPending: (state) => {
      state.fetchSalesResponse = buildColResponse(ResponseStatus.PENDING)
    },
    setFulfilled: (state, action) => {
      state.fetchSalesResponse = buildColResponse(ResponseStatus.FULFILLED, action.payload)
    },
    setRejected: (state, action) => {
      state.fetchSalesResponse = buildColResponse(ResponseStatus.REJECTED, action.payload)
    },
    resetStates: (state) => {
      state.exportAsExcelResponse = buildResponse()
    },
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
    // Fetch Users
    .addCase(fetchUsers.pending, (state) => {
      state.fetchUsersResponse = buildColResponse(ResponseStatus.PENDING)
    })
    .addCase(fetchUsers.fulfilled, (state, action) => {
      state.fetchUsersResponse = buildColResponse(ResponseStatus.FULFILLED, action.payload)
    })
    .addCase(fetchUsers.rejected, (state, action) => {
      state.fetchUsersResponse = buildColResponse(ResponseStatus.REJECTED, action.payload)
    })
  }
})

export const selectSale = (state) => state.sale
export const selectSales = (state) => state.fetchSalesResponse.data ?? []
export const selectUsersResponse = (state) => state.fetchUsersResponse.data ?? []
export const selectTotalCommission = createSelector([selectSales], (sales) => {
  if (isEmpty(sales)) return 0.00
  return sales.reduce((accum, sale) => accum + sale.commission, 0.00)
})
export const selectTotalSales = createSelector([selectSales], (sales) => {
  if (isEmpty(sales)) return 0.00
  return sales.reduce((accum, sale) => accum + computeSum(sale.checkouts), 0.00)
})

export const {
  setSq,
  setTab,
  setSale,
  setPending,
  setFulfilled,
  setRejected,
  resetStates
} = salesSlice.actions
export { exportAsExcel, fetchUsers }
export default salesSlice.reducer