import { createSlice } from "@reduxjs/toolkit"
import { rowsPerPages } from "../../util/Config.jsx"
import { first } from "lodash"

const defaultState = {
  sq: { 
    name: "", 
    status: "", 
    per_page: first(rowsPerPages),
    page: 1 
  }
}
const initialState = { ...defaultState }

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setSq: (state, action) => {
      state.sq = action.payload
    }
  }
})

export const { setSq } = ordersSlice.actions
export default ordersSlice.reducer