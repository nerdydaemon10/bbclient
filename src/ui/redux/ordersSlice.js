import { createSlice } from "@reduxjs/toolkit"
import ModalType from "../../util/classes/ModalType.js"
import { rowsPerPages } from "../../util/Config.jsx"
import { first } from "lodash"
import { OrderParam } from "../../util/params.js"
import local from "../../util/local.js"
import Fallback from "../../util/classes/Fallback.js"

const user = Fallback.checkUser(local.get("user"))

const initialState = {
  sq: { 
    search: "", 
    per_page: first(rowsPerPages), 
    page: 1,
    role: user.role
  },
  order: OrderParam
}

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setSq: (state, action) => {
      const e = action.payload.target
      state.sq = { ...state.sq, [e.name]: e.value }
    },
    previousPage: (state,) => {
      const sq = state.sq
      state.sq = { ...sq, page: sq.page > 1 ? sq.page - 1 : 1 }
    },
    nextPage: (state, action) => {
      const sq = state.sq
      const meta = action.payload

      state.sq = { ...sq, page: sq.page < meta.last_page ? sq.page + 1 : meta.last_page }
    },
    setOrder: (state, action) => {
      state.order = action.payload
    },
    openModal: (state, action) => {
      if (action.payload == ModalType.APPROVE)
        state.isApproveModalOpen = true
      if (action.payload == ModalType.REJECT)
        state.isRejectModalOpen = true
    },
    closeModal: (state, action) => {
      if (action.payload == ModalType.APPROVE)
        state.isApproveModalOpen = false
      if (action.payload == ModalType.REJECT)
        state.isRejectModalOpen = false
    }
  }
})

export const { setSq, previousPage, nextPage, setOrder, openModal, closeModal } = ordersSlice.actions
export default ordersSlice.reducer