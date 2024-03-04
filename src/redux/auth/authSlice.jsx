import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../../services/AuthService.jsx";
import UiStatus from "../../utils/classes/UiStatus.jsx";
import AppLocalStorage from "../../utils/AppLocalStorage.jsx";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await AuthService.login(credentials);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  user: AppLocalStorage.readUser(),
  accessToken: AppLocalStorage.readAccessToken(),
  status: UiStatus.IDLE,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;

      AppLocalStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.error = null;
        state.status = UiStatus.LOADING;
      })
      .addCase(login.fulfilled, (state, action) => {
        const payload = action.payload;
        state.user = payload.user;
        state.error = null;
        state.status = UiStatus.SUCCESS;
        state.accessToken = payload.token

        AppLocalStorage.saveUser(payload.user);
        AppLocalStorage.saveAccessToken(payload.token)

        console.log(AppLocalStorage.readUser());
        console.log(AppLocalStorage.readAccessToken())
      })
      .addCase(login.rejected, (state, action) => {
        state.status = UiStatus.IDLE;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
