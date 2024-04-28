import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AuthService } from "../../data/services"
import { local } from "../../util"
import { isEmpty } from "lodash"

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
  loginResponse: { 
    isLoading: false,
    isSuccess: false,
    error: null
  },
  logoutResponse: { 
    isLoading: false,
    isSuccess: false,
    error: null
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
		builder
    .addCase(login.pending, (state) => {
      state.loginResponse = {
        isLoading: true,
        isSuccess: false,
        error: null 
      }
    })
    .addCase(login.fulfilled, (state, action) => {
      const { token, user } = action.payload

      state.loginResponse = {
        isLoading: false,
        isSuccess: true,
        error: null
      }
      
      local.set("token", token)
      local.set("user", user)
    })
    .addCase(login.rejected, (state, action) => {
      state.loginResponse = {
        isLoading: false,
        isSuccess: false,
        error: action.payload 
      }
    })

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

export const {  } = authSlice.actions
export default authSlice.reducer