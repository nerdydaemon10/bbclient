import { createSlice } from "@reduxjs/toolkit"

const defaultState = {
  breadcrumbItems: []
}

const initialState = { ...defaultState }
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setBreadcrumb: (state, action) => {
      state.breadcrumbItems = action.payload
    }
  }
})

export const { setBreadcrumb } = dashboardSlice.actions
export default dashboardSlice.reducer