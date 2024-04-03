import { combineReducers, configureStore } from "@reduxjs/toolkit"

import authSlice from "./auth/authSlice.jsx"
import inventorySlice from "./inventory/inventorySlice.jsx"
import productsSlice from "./products/productsSlice.jsx"
import posSlice from "./pos/posSlice.jsx"

const reducer = combineReducers({
  auth: authSlice,
  inventory: inventorySlice,
  products: productsSlice,
  pos: posSlice
})

const store = configureStore({
  reducer: reducer,
  devTools: true
})

export default store