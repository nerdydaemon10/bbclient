import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import local from "../../util/local.js"
import { auth } from "../../data/services/auth.js"

const authSlice = createSlice({
  name: "auth",
  initialState: null,
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(auth.endpoints.login.matchFulfilled), (_, action) => {
        const { token, user } = action.payload

        local.set("token", token)
        local.set("user", user)
      }
    )
  }
})

export default authSlice.reducer