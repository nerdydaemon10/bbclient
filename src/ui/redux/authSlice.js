import { createSlice, isAnyOf } from "@reduxjs/toolkit"

import auth from "../../data/services/auth.js"
import { isEmpty, isNil } from "lodash"
import secureLocalStorage from "react-secure-storage"

const authSlice = createSlice({
  name: "auth",
  initialState: { isAuthorized: true },
  reducers: {
    deAuthorize: (state) => {
      state.isAuthorized = false
      secureLocalStorage.clear()
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
    isAnyOf(auth.endpoints.login.matchFulfilled), (state, action) => {
      const { token, user } = action.payload

      state.isAuthenticated = !isNil(token) || !isEmpty(token)

      secureLocalStorage.setItem("token", token)
      secureLocalStorage.setItem("user", user)
    })
    builder.addMatcher(
    isAnyOf(auth.endpoints.logout.matchFulfilled), (state, action) => {
      state.isAuthenticated = false
      secureLocalStorage.clear()
    })
    builder.addMatcher(
    isAnyOf(auth.endpoints.logout.matchRejected), (state, action) => {
      state.isAuthenticated = false
      secureLocalStorage.clear()
    })
  }
})

export const { deAuthorize } = authSlice.actions
export default authSlice.reducer