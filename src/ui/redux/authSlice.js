import { createSlice, isAnyOf } from "@reduxjs/toolkit"

import local from "../../util/local.js"
import auth from "../../data/services/auth.js"
import { isEmpty, isNil } from "lodash"

const token = local.get("token")

const authSlice = createSlice({
  name: "auth",
  initialState: {  
    isAuthenticated: !isNil(token) || !isEmpty(token)
  },
  reducers: {
    deAuthenticated: (state) => state.isAuthenticated = false
  },
  extraReducers: (builder) => {
    builder.addMatcher(
    isAnyOf(auth.endpoints.login.matchFulfilled), (state, action) => {
      const { token, user } = action.payload

      state.isAuthenticated = !isNil(token) || !isEmpty(token)
      
      local.set("token", token)
      local.set("user", user)
    })
    builder.addMatcher(
    isAnyOf(auth.endpoints.logout.matchFulfilled), (state, action) => {
      state.isAuthenticated = false
      local.clear()
    })
    builder.addMatcher(
    isAnyOf(auth.endpoints.logout.matchRejected), (state, action) => {
      state.isAuthenticated = false
      local.clear()
    })
  }
})

export const { deAuthenticated } = authSlice.actions
export default authSlice.reducer