import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsSlice from "./products/productSlice.jsx";
import authSlice from "./auth/authSlice.jsx";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";

const reducer = combineReducers({
  auth: authSlice,
  products: productsSlice
})
//const config = { key: 'root', storage }

//const persistedReducer = persistReducer(config, reducer)

const store = configureStore({
  reducer: reducer,
  devTools: true
})

export default store

//const persistor = persistStore(store)

//export { store, persistor }