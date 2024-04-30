import { createSlice } from "@reduxjs/toolkit"

const defaultState = { 
  order: {
    status: "",
    payment_method: "",
    checkouts: []
  }
}
const initialState = { ...defaultState }

const checkoutsSlice = createSlice({
  name: "checkouts",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload
    }
  }
})

export const { 
  setOrder
} = checkoutsSlice.actions
export default checkoutsSlice.reducer