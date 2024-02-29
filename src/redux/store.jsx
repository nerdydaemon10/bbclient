import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./products/productSlice.jsx";
import authSlice from "./auth/authSlice.jsx";

export const store = configureStore({
  reducer:{
    auth: authSlice,
    products: productsSlice
  },
  devTools: true
})