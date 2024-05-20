import { createSlice } from "@reduxjs/toolkit"
import { rowsPerPages } from "../../util/Config.jsx"
import { first } from "lodash"
import ModalType from "../../util/classes/ModalType.js"
import { EmployeeDto } from "../../data/dto.js"

const initialState = {
  sq: { search: "", per_page: first(rowsPerPages), page: 1 },
  employee: EmployeeDto,
  isCreateModalOpen: false,
  isUpdateModalOpen: false,
  isRemoveModalOpen: false
}
const employeesSlice = createSlice({
  name: "employees",
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
    setEmployee: (state, action) => { 
      state.employee = { ...state.employee, ...action.payload }
    },
    openModal: (state, action) => {
      if (action.payload == ModalType.CREATE)
        state.isCreateModalOpen = true
      if (action.payload == ModalType.UPDATE)
        state.isUpdateModalOpen = true
      if (action.payload == ModalType.REMOVE)
        state.isRemoveModalOpen = true
    },
    closeModal: (state, action) => {
      if (action.payload == ModalType.CREATE)
        state.isCreateModalOpen = false
      if (action.payload == ModalType.UPDATE)
        state.isUpdateModalOpen = false
      if (action.payload == ModalType.REMOVE)
        state.isRemoveModalOpen = false 
    }
  }
})

export const { setSq, previousPage, nextPage, setEmployee, openModal, closeModal } = employeesSlice.actions
export default employeesSlice.reducer