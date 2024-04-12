import { createSlice } from "@reduxjs/toolkit"

import { rowsPerPages } from "../../utils/Config.jsx"

const defaultState = {
  searchQuery: { name: "", category_id: "", per_page: rowsPerPages[0].id, page: 1 }
}
const initialState = { ...defaultState }

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    }
  }
})

export const { setSearchQuery } = ordersSlice.actions
export default ordersSlice.reducer