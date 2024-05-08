import { combineReducers, configureStore } from "@reduxjs/toolkit"

import inventorySlice from "./inventorySlice.js"
import posSlice from "./posSlice.js"
import customersSlice from "./customersSlice.js"
import authSlice from "./authSlice.js"
import ordersSlice from "./ordersSlice.js"
import salesSlice from "./salesSlice.js"
import client from "../../data/services/client.js"
import employeesSlice from "./employeesSlice.js"

const reducer = combineReducers({
  [client.reducerPath]: client.reducer,
  auth: authSlice,
  pos: posSlice,
  inventory: inventorySlice,
  customers: customersSlice,
  orders: ordersSlice,
  sales: salesSlice,
  employees: employeesSlice,
})

const store = configureStore({
  reducer: reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ 
    serializableCheck: false 
  }).concat(client.middleware),
  devTools: true
})

export default store