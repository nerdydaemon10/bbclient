import { createSlice, isAnyOf } from "@reduxjs/toolkit"

import local from "../../util/local.js"
import auth from "../../data/services/auth.js"

const initialState = {
  user: local.get("user")
}

const authSlice = createSlice({
  name: "auth",
  initialState: null,
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(auth.endpoints.login.matchFulfilled), (state, action) => {
      const { token, user } = action.payload

      local.set("token", token)
      local.set("user", user)
    })
    builder.addMatcher(
      isAnyOf(auth.endpoints.logout.matchFulfilled), (state, action) => {
      local.clear()
    })
  }
})

//export const { clearUser } = authSlice.actions
export default authSlice.reducer