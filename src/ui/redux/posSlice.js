import { first, isEmpty, isNil, size } from "lodash"
import { produce } from "immer"
import { createSelector, createSlice, isAnyOf } from "@reduxjs/toolkit"

import { TabsData } from "../pos/Util.jsx"
import { TableType } from "../../util/classes"
import { PaymentMethodsData, rowsPerPages } from "../../util/Config.jsx"
import { compareEntity, computeChange, computeCheckouts, computeQty, toItems, toQty } from "../../util/helper.js"
import orders from "../../data/services/orders.js"

const checkoutsTab = first(TabsData).value

const initialState = {
  productsSq: {
    search: "",
    category_id: "",
    per_page: first(rowsPerPages), 
    page: 1,
  },
  customersSq: {
    search: "",
    per_page: first(rowsPerPages), 
    page: 1,
  },
  paymentMethod: first(PaymentMethodsData).value,
  amount: "0.00",
  customer: null,
  table: TableType.PRODUCTS,
  tab: checkoutsTab,
  checkouts: []
}

const posSlice = createSlice({
  name: "pos",
  initialState,
  reducers: {
    setSq: (state, action) => {
      const e = action.payload.target

      if (state.table == TableType.PRODUCTS)
        state.productsSq = produce(state.productsSq, draft => { draft[e.name] = e.value })
      if (state.table == TableType.CUSTOMERS)
        state.customersSq = produce(state.customersSq, draft => { draft[e.name] = e.value })
    },
    previousPage: (state,) => {
      if (state.table == TableType.PRODUCTS) {
        state.productsSq = produce(state.productsSq, draft => { 
          draft.page = draft.page > 1 ? draft.page - 1  : 1 
        })
      }
      if (state.table == TableType.CUSTOMERS) {
        state.customersSq = produce(state.customersSq, draft => { 
          draft.page = draft.page > 1 ? draft.page - 1  : 1 
        })
      }
    },
    nextPage: (state, action) => {
      const meta = action.payload

      if (state.table == TableType.PRODUCTS) {
        state.productsSq = produce(state.productsSq, draft => {
          draft.page = draft.page < meta.last_page ? draft.page + 1 : meta.last_page 
        })
      }
      if (state.table == TableType.CUSTOMERS) {
        state.customersSq = produce(state.customersSq, draft => { 
          draft.page = draft.page < meta.last_page ? draft.page + 1 : meta.last_page 
        })
      }
    },
    checkout: (state, action) => {
      const product = action.payload
      const checkoutsTab = first(TabsData).value

      if (state.tab != checkoutsTab) state.tab = checkoutsTab
      state.checkouts = produce(state.checkouts, draft => {
        draft.push({
          id: product.id,
          product_code: product.product_code,
          category_id: product.category_id,
          name: product.name,
          description: product.description,
          srp: product.srp,
          member_price: product.member_price,
          stocks: product.quantity, 
          quantity: 1
        })
      })
    },
    decrementQty: (state, action) => {
      const id = action.payload
      
      state.checkouts = state.checkouts.map(checkout => {
        if (checkout.id != id) return checkout
        if (checkout.quantity == 0) return checkout

        return produce(checkout, draft => { draft.quantity -= 1 })
      }).filter(checkout => checkout.quantity > 0)
    },
    incrementQty: (state, action) => {
      const id = action.payload 

      state.checkouts = state.checkouts.map(checkout => {
        if (checkout.id != id) return checkout
        if (checkout.quantity >= checkout.stocks) return checkout

        return produce(checkout, draft => { draft.quantity += 1 })
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
      if (compareEntity(state.customer, action.payload))
        state.customer = null
      else
        state.customer = action.payload
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload
    },
    setAmount: (state, action) => {
      const value = action.payload.target.value

      if (isNaN(value)) return

      state.amount =  value
    }
  },
  extraReducers: (builder) => { 
    builder.addMatcher(
      isAnyOf(orders.endpoints.createOrder.matchFulfilled), (state) => {
      state.checkouts = []
      state.customer = null
      state.paymentMethod = first(PaymentMethodsData).value

      if (state.tab != checkoutsTab) 
        state.tab = checkoutsTab
      if (state.table != TableType.PRODUCTS) 
        state.table = TableType.PRODUCTS
    })
  }
})

export const selectReceipts = createSelector(
(state) => state.pos,
(state) => {
  const { checkouts, customer, amount } = state

  const items = toItems(size(checkouts))
  const qty = toQty(computeQty(checkouts))
  const total = computeCheckouts(checkouts)
  const change = computeChange(total, amount)

  const isChangeVisible = !isEmpty(checkouts) && !isNil(customer) && amount > 0.00

  return isChangeVisible? [
    { label: "Items/Qty", value: `${items}/${qty}`},
    { label: "Change", format: "currency", value: change},
    { label: "Total", format: "currency", value: total },
  ] : [
    { label: "Items/Qty", value: `${items}/${qty}`},
    { label: "Total", format: "currency", value: total },
  ]
})

export const selectIsOrderCompleted = createSelector(
  (state) => state.pos,
  (state) => {
    const { checkouts, customer, amount } = state

    const total = computeCheckouts(checkouts)
    const validAmount = amount >= total

    return !isEmpty(checkouts) && !isNil(customer) && validAmount
  }
)

export const selectSq = (state) => {
  return state.table == TableType.PRODUCTS 
    ? state.productsSq 
    : state.customersSq
}

export const {
  setSq,
  previousPage,
  nextPage,
  checkout,
  incrementQty,
  decrementQty,
  toggleTable,
  setTab,
  setCustomer,
  setPaymentMethod,
  setAmount
} = posSlice.actions
export default posSlice.reducer