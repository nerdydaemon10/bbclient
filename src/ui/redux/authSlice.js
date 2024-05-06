import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AuthService } from "../../data/services"
import { local } from "../../util"
import { isEmpty } from "lodash"
import MutationResponse from "../../util/classes/MutationResponse.js"

export const login = createAsyncThunk(
  "auth/login", async (credentials, thunkAPI) => {
  try {
    const response = await AuthService.login(credentials)
    return response
  } catch(error) {
    if (isEmpty(error.response)) return thunkAPI.rejectWithValue(error)
    return thunkAPI.rejectWithValue(error.response.data)
  }
})
export const logout = createAsyncThunk(
  "auth/logout", async (thunkAPI) => {
  try {
    const response = await AuthService.logout()
    return response
  } catch(error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})
const initialState = {
  loginResponse: MutationResponse.Idle(),
  logoutResponse: MutationResponse.Idle()
}
const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
		builder
    // Login User
    .addCase(login.pending, (state) => {
      state.loginResponse = MutationResponse.Pending()
    })
    .addCase(login.fulfilled, (state, action) => {
      state.loginResponse = MutationResponse.Fulfilled(action.payload)
    })
    .addCase(login.rejected, (state, action) => {
      state.loginResponse = MutationResponse.Rejected(action.payload)
    })
    // logout User
    .addCase(logout.pending, (state) => {
      state.logoutResponse = MutationResponse.Pending()
    })
    .addCase(logout.fulfilled, (state) => {
      state.logoutResponse = MutationResponse.Fulfilled()
      local.clear()
    })
    .addCase(logout.rejected, (state, action) => {
      state.logoutResponse = MutationResponse.Rejected(action.payload)
    })
  }
})

export default authSlice.reducer