import { combineReducers, configureStore } from "@reduxjs/toolkit";
//import productsSlice from "./products/productSlice.jsx";
import authSlice from "./auth/authSlice.jsx";

const reducer = combineReducers({
  auth: authSlice
  //products: productsSlice
})

const store = configureStore({
  reducer: reducer,
  devTools: true
})

export default store