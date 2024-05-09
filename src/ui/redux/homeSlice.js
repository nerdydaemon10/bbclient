import { createSlice } from "@reduxjs/toolkit"
import { first } from "lodash"
import { IntervalsData } from "../../util/Config.jsx"

const initialState = {
  sq: { interval: first(IntervalsData).value }
}

const homeSlice = createSlice({
  name: "home",
  initialState: initialState,
  reducers: { 
    setInterval: (state, action) => {
      state.sq.interval = action.payload
    }
  }
})

export const { setInterval } = homeSlice.actions
export default homeSlice.reducer