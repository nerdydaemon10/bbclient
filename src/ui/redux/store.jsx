import { combineReducers, configureStore } from "@reduxjs/toolkit"

import inventorySlice from "./inventorySlice.jsx"
import posSlice from "./posSlice.jsx"
import customersSlice from "./customersSlice.jsx"
import authSlice from "./authSlice.jsx"
import ordersSlice from "./ordersSlice.jsx"
import { pokemonApi } from "./apiSlice.jsx"

const reducer = combineReducers({
  auth: authSlice,
  pos: posSlice,
  inventory: inventorySlice,
  customers: customersSlice,
  orders: ordersSlice,
  [pokemonApi.reducerPath]: pokemonApi.reducer
})

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
  devTools: true
})

export default store