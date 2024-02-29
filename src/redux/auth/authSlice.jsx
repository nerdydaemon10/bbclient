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

export const loggedIn = () => {
  const accessToken = localStorage.getItem("accessToken")
  
  if (accessToken == undefined || accessToken == null) {
    return false
  }

  return true
}

const initialState = {
  user: null,
  status: UiStatus.IDLE,
  error: null
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
    }
	},
  extraReducers: (builder) => {
		builder
    .addCase(login.pending, (state) => { 
      state.error = null
      state.status = UiStatus.LOADING
    })
    .addCase(login.fulfilled, (state, action) => {
      state.error = null
      state.status = UiStatus.IDLE

      localStorage.setItem("user", action.payload.user)
      localStorage.setItem("accessToken", action.payload.token)
    })
    .addCase(login.rejected, (state, action) => {
      state.status = UiStatus.IDLE
      state.error = action.payload
      console.log()
    })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer