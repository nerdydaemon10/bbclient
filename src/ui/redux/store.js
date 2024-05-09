import { combineReducers, configureStore } from "@reduxjs/toolkit"

import inventorySlice from "./inventorySlice.js"
import posSlice from "./posSlice.js"
import customersSlice from "./customersSlice.js"
import authSlice from "./authSlice.js"
import ordersSlice from "./ordersSlice.js"
import salesSlice from "./salesSlice.js"
import client from "../../data/services/client.js"
import employeesSlice from "./employeesSlice.js"
import homeSlice from "./homeSlice.js"
import local from "../../util/local.js"

const reducer = combineReducers({
  [client.reducerPath]: client.reducer,
  auth: authSlice,
  pos: posSlice,
  home: homeSlice,
  inventory: inventorySlice,
  customers: customersSlice,
  orders: ordersSlice,
  sales: salesSlice,
  employees: employeesSlice
})

const errorHandlingMiddleware = (store) => (next) => (action) => {
  if (action.type.endsWith('rejected') && action.payload.status === 401) {
    //local.clear()
  }
  return next(action)
}

const store = configureStore({
  reducer: reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ 
    serializableCheck: false 
  }).concat(client.middleware, errorHandlingMiddleware),
  devTools: true
})

export default store