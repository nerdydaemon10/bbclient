import { combineReducers, configureStore } from "@reduxjs/toolkit"

import inventorySlice from "./inventorySlice.js"
import posSlice from "./posSlice.js"
import customersSlice from "./customersSlice.js"
import authSlice from "./authSlice.js"
import ordersSlice from "./ordersSlice.js"
import dashboardSlice from "./dashboardSlice.js"
import salesSlice from "./salesSlice.js"

const reducer = combineReducers({
  auth: authSlice,
  dashboard: dashboardSlice,
  pos: posSlice,
  inventory: inventorySlice,
  customers: customersSlice,
  orders: ordersSlice,
  sales: salesSlice
})

const store = configureStore({
  reducer: reducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
  devTools: true
})

export default store