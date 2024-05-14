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

const authMiddleware = (store) => (next) => (action) => {
  if (isNil(action.payload)) return next(action)
  if (isNil(action.payload.status)) return next(action)
  if (action.payload.status == 401) local.clear()
}

const store = configureStore({
  reducer: reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ 
    serializableCheck: false 
  }).concat(client.middleware, authMiddleware),
  devTools: true
})

export default store