import { combineReducers, configureStore } from "@reduxjs/toolkit"

import inventorySlice from "./inventorySlice.js"
import posSlice from "./posSlice.js"
import customersSlice from "./customersSlice.js"
import authSlice, { deAuthorize } from "./authSlice.js"
import ordersSlice from "./ordersSlice.js"
import salesSlice from "./salesSlice.js"
import client from "../../data/services/client.js"
import employeesSlice from "./employeesSlice.js"
import homeSlice from "./homeSlice.js"
import { isNil } from "lodash"

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

const getStatus = (action) => {
  if (isNil(action.payload)) return ""
  if (isNil(action.payload.status)) return ""

  return action.payload.status
}

const authenticateMiddleware = (store) => (next) => (action) => {
  if (getStatus(action) == 401) { 
    store.dispatch(deAuthorize())
  }
  return next(action)
}

const store = configureStore({
  reducer: reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ 
    serializableCheck: false 
  }).concat(client.middleware, authenticateMiddleware),
  devTools: true
})

export default store