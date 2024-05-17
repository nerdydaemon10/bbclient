import { createSelector, createSlice, isAnyOf } from "@reduxjs/toolkit"
import ModalType from "../../util/classes/ModalType.js"
import { rowsPerPages } from "../../util/Config.jsx"
import { first, isNil, size } from "lodash"
import { compareEntity, computeCheckouts, computeQty, toItems, toQty } from "../../util/helper.js"
import { employees } from "../../data/services/employees.js"
import { produce } from "immer"

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
  salespersons: [],
  modifyOrder: null,
  viewOrder: null,
  isApproveModalOpen: false,
  isRejectModalOpen: false
}

const ordersSlice = createSlice({
  name: "orders",
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
    setOrder: (state, action) => {
      const { type, order } = action.payload

      if (type == "modify") {
        state.modifyOrder = order
      }
      if (type == "view") {
        const isSelected = !isNil(state.viewOrder) && compareEntity(state.viewOrder, order)
        state.viewOrder = isSelected ? null : order
      }
    },
    openModal: (state, action) => {
      if (action.payload == ModalType.APPROVE)
        state.isApproveModalOpen = true
      if (action.payload == ModalType.REJECT)
        state.isRejectModalOpen = true
    },
    closeModal: (state, action) => {
      if (action.payload == ModalType.APPROVE)
        state.isApproveModalOpen = false
      if (action.payload == ModalType.REJECT)
        state.isRejectModalOpen = false
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(employees.endpoints.fetchEmployees.matchFulfilled), (state, action) => {  
      state.salespersons = action.payload.data
    })
  }
})
export const selectReceipts = createSelector(
(state) => state.orders.viewOrder,
(viewOrder) => {
  if (isNil(viewOrder)) return []
  
  const items = toItems(size(viewOrder.checkouts))
  const qty = toQty(computeQty(viewOrder.checkouts))
  const orderTotal = computeCheckouts(viewOrder.checkouts)

  return [
    { 
      label: "Salesp.  Commission", 
      format: "currency", 
      value: viewOrder.commission
    },
    { label: "Total Items/Qty", value: `${items}/${qty}`},
    { label: "Total", format: "currency", value: orderTotal }
  ]
})
export const selectCheckoutSize = createSelector(
  (state) => state.orders, 
  (orders) => isNil(orders.viewOrder) ? 0 : size(orders.viewOrder.checkouts)
)

export const { setSq, resetSq, previousPage, nextPage, setOrder, openModal, closeModal } = ordersSlice.actions
export default ordersSlice.reducer