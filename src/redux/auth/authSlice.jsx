import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { callApi } from "../../utils/helpers/api/callApi";

const loginUser = createAsyncThunk("user/auth", async (credentials) => {
    try {
        const response = await callApi('post', '/auth', credentials)
        return response.data
    } catch (error) {
        console.log("Error Logging in", error)
    }
})

const initialState = {
    user: [],
    status: "idle",
    loading: false,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{

    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state) => {
            state.loading = true
            state.status = "pending"
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false
            state.status = "success"
            state.user = action.payload
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false
            state.status = "failed"
            state.error = action.error.message
        })
    }
})

export default authSlice.reducer