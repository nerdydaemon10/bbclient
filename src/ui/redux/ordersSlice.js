import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import ModalType from "../../util/classes/ModalType.js"
import { rowsPerPages } from "../../util/Config.jsx"
import { first, isNil } from "lodash"
import local from "../../util/local.js"
import Fallback from "../../util/classes/Fallback.js"
import { compareEntity } from "../../util/helper.js"
import { employees } from "../../data/services/employees.js"

const user = Fallback.checkUser(local.get("user"))

const initialState = {
  sq: {
    employee_id: "",
    customer: "",
    start_date: "",
    end_date: "",
    status: "",
    payment_method: "",
    per_page: first(rowsPerPages), 
    page: 1,
    role: user.role
  },
  salespersons: [],
  modifyOrder: null,
  viewOrder: null,
  isApproveModalOpen: false,
  isRejectModalOpen: false
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
      const { type, order } = action.payload

      if (type == "modify") {
        state.modifyOrder = order
      }
      if (type == "view") {
        const isSelected = !isNil(state.viewOrder) && compareEntity(state.viewOrder, order)
        state.viewOrder = isSelected ? null : order
      }
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
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(employees.endpoints.fetchEmployees.matchFulfilled), (state, action) => {  
      state.salespersons = action.payload.data
    })
  }
})

export const { setSq, previousPage, nextPage, setOrder, openModal, closeModal } = ordersSlice.actions
export default ordersSlice.reducer