import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AuthService } from "../../data/services"
import { local } from "../../util"
import { isEmpty } from "lodash"
import { buildResponse } from "../../util/Config.jsx"
import ResponseStatus from "../../util/classes/ResponseStatus.js"

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
  loginResponse: buildResponse(),
  logoutResponse: buildResponse()
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
		builder
    // Login
    .addCase(login.pending, (state) => {
      state.loginResponse = buildResponse(ResponseStatus.PENDING)
    })
    .addCase(login.fulfilled, (state, action) => {
      const { token, user } = action.payload
      
      state.loginResponse = buildResponse(ResponseStatus.FULFILLED, action.payload)

      local.set("token", token)
      local.set("user", user)
    })
    .addCase(login.rejected, (state, action) => {
      state.loginResponse = buildResponse(ResponseStatus.REJECTED, action.payload)
    })
    // Logout
    .addCase(logout.pending, (state) => {
      state.loginResponse = {
        isLoading: false,
        isSuccess: false,
        error: null 
      }
    })
    .addCase(logout.fulfilled, (state) => {
      state.logoutResponse = {
        isLoading: false,
        isSuccess: true,
        error: null,
      }
      local.clear()
    })
    .addCase(logout.rejected, (state, action) => {
      state.logoutResponse = {
        isLoading: false,
        isSuccess: false,
        error: action.payload,
      }
    })
  }
})

export default authSlice.reducer