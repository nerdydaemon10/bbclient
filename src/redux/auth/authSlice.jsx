import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import AuthService from "../../services/AuthService.js"

export const login = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
  try {
    const response = await AuthService.login(credentials)
    return response
  } catch(error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

const initialState = {
  employee: null,
  status: "idle",
  error: null
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.employee = null
    }
	},
  extraReducers: (builder) => {
		builder
    .addCase(login.pending, (state) => { 
      state.status = "loading"
    })
    .addCase(login.fulfilled, (state, action) => {
      state.status = "idle"
      state.employee = action.payload
    })
    .addCase(login.rejected, (state, action) => { 
      state.status = "idle"
      state.error = action.payload
    })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer