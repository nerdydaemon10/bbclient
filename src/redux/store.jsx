import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./products/productSlice";
import authSlice from "./auth/authSlice";

export const store = configureStore({
    reducer:{
        auth: authSlice,
        products: productSlice
    },
    devTools: true
})