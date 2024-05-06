import { createSlice } from "@reduxjs/toolkit"
import { rowsPerPages } from "../../util/Config.jsx"
import { first } from "lodash"
import ModalType from "../../util/classes/ModalType.js"

const initialState = {
  sq: { search: "", per_page: first(rowsPerPages), page: 1 },
  employee: { id: 0, full_name: "", username: "", password: "" },
  isCreateModalOpen: false,
  isUpdateModalOpen: false,
  isRemoveModalOpen: false,
}
const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setSq: (state, action) => { 
      state.sq = action.payload
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

export const { setSq, setEmployee, openModal, closeModal } = employeesSlice.actions
export default employeesSlice.reducer