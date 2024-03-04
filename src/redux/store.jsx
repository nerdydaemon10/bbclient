import { combineReducers, configureStore } from "@reduxjs/toolkit"

import authSlice from "./auth/authSlice.jsx"
import inventorySlice from "./inventory/inventorySlice.jsx"

const reducer = combineReducers({
  auth: authSlice,
  inventory: inventorySlice
  //products: productsSlice
})

const store = configureStore({
  reducer: reducer,
  devTools: true
})

export default store