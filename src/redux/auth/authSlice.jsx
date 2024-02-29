import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import AuthService from "../../services/AuthService.jsx"
import UiStatus from "../../utils/classes/UiStatus.jsx"

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
  status: UiStatus.IDLE,
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
      state.status = UiStatus.LOADING
    })
    .addCase(login.fulfilled, (state, action) => {
      state.status = UiStatus.IDLE
      state.employee = action.payload
    })
    .addCase(login.rejected, (state, action) => { 
      state.status = UiStatus.IDLE
      state.error = action.payload
    })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer