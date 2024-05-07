import { createSlice } from "@reduxjs/toolkit"
import ModalType from "../../util/classes/ModalType.js"
import { rowsPerPages } from "../../util/Config.jsx"
import { first } from "lodash"

const defaultState = {
  sq: { search: "", per_page: first(rowsPerPages), page: 1 },
  customer: { id: 0, full_name: "", address: "", phone_number: "", email_address: "" },
  isCreateModalOpen: false,
  isUpdateModalOpen: false,
  isRemoveModalOpen: false
}
const initialState = { ...defaultState }
const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    openModal: (state, action) => {
      if (action.payload == ModalType.CREATE) state.isCreateModalOpen = true
      if (action.payload == ModalType.UPDATE) state.isUpdateModalOpen = true
      if (action.payload == ModalType.REMOVE) state.isRemoveModalOpen = true
    },
    closeModal: (state, action) => {
      if (action.payload == ModalType.CREATE) state.isCreateModalOpen = false
      if (action.payload == ModalType.UPDATE) state.isUpdateModalOpen = false
      if (action.payload == ModalType.REMOVE) state.isRemoveModalOpen = false
    },
    setSq: (state, action) => {
      state.sq = action.payload
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
    setCustomer: (state, action) => {
      state.customer = action.payload
    }
  }
})

export const { setSq, previousPage, nextPage, openModal, closeModal, setCustomer } = customersSlice.actions
export default customersSlice.reducer