import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import AuthService from "../../data/services/AuthService.jsx"
import AppLocalStorage from "../../utils/AppLocalStorage.jsx"

export const loginAsync = createAsyncThunk(
  "auth/loginAsync", 
  async (credentials, thunkAPI) => {
  try {
    const response = await AuthService.login(credentials)
    return response
  } catch(error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

const initialState = {
  loginApiResource: { 
    isLoading: false, 
    isSuccess: false, 
    data: null, 
    error: null
  },
  accessToken: AppLocalStorage.readAccessToken(),
  user: AppLocalStorage.readUser(),
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.accessToken = null

      AppLocalStorage.clear()
    },
  },
  extraReducers: (builder) => {
		builder
    .addCase(loginAsync.pending, (state) => {
      state.loginApiResource = {
        isLoading: true,
        isSuccess: false,
        data: null,
        error: null 
      }
    })
    .addCase(loginAsync.fulfilled, (state, action) => {
      const { accessToken, user } = action.payload

      state.user = user.user
      state.accessToken = accessToken

      state.loginApiResource = {
        isLoading: false,
        isSuccess: true,
        data: action.payload,
        error: null
      }

      AppLocalStorage.saveUser(user.user)
      AppLocalStorage.saveAccessToken(accessToken)
    })
    .addCase(loginAsync.rejected, (state, action) => {
      state.loginApiResource = {
        isLoading: false,
        isSuccess: false,
        data: null,
        error: action.payload 
      }
    })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer