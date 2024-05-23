import { createSelector, createSlice, isAnyOf } from "@reduxjs/toolkit"
import { rowsPerPages } from "../../util/Config.jsx"
import { first, isNil, size } from "lodash"
import { compareEntity, computeCheckouts, computeQty, computeSales, toItems, toQty } from "../../util/helper.js"
import { sales } from "../../data/services/sales.js"
import moment from "moment"
import { employees } from "../../data/services/employees.js"
import { produce } from "immer"

const initialState = {
  sq: {
    employee_id: "",
    customer: "",
    start_date: "",
    end_date: "",
    status: "approved",
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
    resetSq: (state) => {
      state.sq = produce(initialState, draft => draft.sq)
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
      const isSelected = !isNil(state.sale) && compareEntity(state.sale, action.payload)
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

export const selectReceipts = createSelector(
  (state) => state.sales,
  (state) => {
    const sale = state.sale
    const sales = state.sales
    const totalSales = computeSales(sales)

    if (isNil(sale)) return [{ label: "Overall Sales", format: "currency", value: totalSales }]

    const items = toItems(size(sale.checkouts))
    const qty = toQty(computeQty(sale.checkouts))
    const orderTotal = computeCheckouts(sale.checkouts)
    const commission = sale.commission

    return [
      { label: "Salesp. Commission", format: "currency", value: commission},
      { label: "Total Items/Qty", value: `${items}/${qty}`},
      { label: "Total", format: "currency", value: orderTotal}
    ]
  })
export const selectSq = (state) => state.sales.sq
export const selectSale = (state) => state.sales.sale
export const selectCheckoutsSize = createSelector((state) => state.sales.sale, (sale) => isNil(sale) ? 0 : size(sale.checkouts))

export const {
  setSq,
  resetSq,
  setTab,
  setSale
} = salesSlice.actions
export default salesSlice.reducer