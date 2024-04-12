import { combineReducers, configureStore } from "@reduxjs/toolkit"

import inventorySlice from "./inventorySlice.jsx"
import posSlice from "./pos/posSlice.jsx"
import customersSlice from "./customersSlice.jsx"
import authSlice from "./authSlice.jsx"
import ordersSlice from "./ordersSlice.jsx"

const reducer = combineReducers({
  auth: authSlice,
  pos: posSlice,
  inventory: inventorySlice,
  customers: customersSlice,
  orders: ordersSlice
})

const store = configureStore({
  reducer: reducer,
  devTools: true
})

export default store