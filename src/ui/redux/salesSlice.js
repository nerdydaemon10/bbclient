import { createSelector, createSlice, isAnyOf } from "@reduxjs/toolkit"
import { rowsPerPages } from "../../util/Config.jsx"
import { first, isEmpty, isNil } from "lodash"
import { computeSum, isEntitySelected } from "../../util/helper.jsx"
import { sales } from "../../data/services/sales.js"
import moment from "moment"
import { employees } from "../../data/services/employees.js"

const initialState = {
  sq: {
    employee_id: "",
    customer: "",
    start_date: "",
    end_date: "",
    status: "",
    payment_method: "",
    per_page: first(rowsPerPages), 
    page: 1
  },
  sale: null,
  sales: [],
  salespersons: []
}

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    setSq: (state, action) => {
      const e = action.payload.target
      state.sq = { ...state.sq, [e.name]: e.value }
    },
    previousPage: (state,) => {
      const sq = state.sq
      state.sq = { ...sq, page: sq.page > 1 ? sq.page - 1 : 1 }
    },
    nextPage: (state, action) => {
      const sq = state.sq
      const meta = action.payload

      state.sq = { ...sq, page: sq.page < meta.last_page ? sq.page + 1 : meta.last_page }
    },
    setSale: (state, action) => {
      const isSelected = !isNil(state.sale) && isEntitySelected(state.sale, action.payload)
      state.sale = isSelected ? null : action.payload
    },
    setTab: (state, action) => {
      state.tab = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(sales.endpoints.fetchSales.matchFulfilled), (state, action) => {  
      state.sales = action.payload.data
    })
    builder.addMatcher(
      isAnyOf(employees.endpoints.fetchEmployees.matchFulfilled), (state, action) => {  
      state.salespersons = action.payload.data
    })
    builder.addMatcher(
      isAnyOf(sales.endpoints.downloadSales.matchFulfilled), (_, action) => {
      console.log(action.payload)
      const now = moment.now()
      const name = `SALES_REPORT_${now}.xlsx`

      const url = URL.createObjectURL(action.payload)
      const link = document.createElement('a')

      link.href = url
      link.setAttribute("download", name)
      
      document.body.appendChild(link)
      link.click()

      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    })
  }
})

export const selectSale = (state) => state.sale
export const selectSales = (state) => state.sales
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
  setSale
} = salesSlice.actions
export default salesSlice.reducer