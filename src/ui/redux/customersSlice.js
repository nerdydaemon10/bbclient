import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import ModalType from "../../util/classes/ModalType.js"
import { CustomerService } from "../../data/services"
import { buildColResponse, buildResponse, rowsPerPages } from "../../util/Config.jsx"
import ResponseStatus from "../../util/classes/ResponseStatus.js"

const createCustomer = createAsyncThunk(
  "customers/createCustomer", async (param, thunkAPI) => {
  try {
    const response = await CustomerService.create(param)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})
const updateCustomer = createAsyncThunk(
  "customers/updateCustomer", 
  async (customer, thunkAPI) => {
    try {
      const response = await CustomerService.update(customer)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
})
const removeCustomer = createAsyncThunk(
  "customers/removeCustomer", 
  async (id, thunkAPI) => {
    try {
      const response = await CustomerService.remove(id)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
})

const defaultState = {
  sq: { full_name: "", category_id: "", per_page: rowsPerPages[0].id, page: 1 },
  customer: { id: 0, full_name: "", address: "", phone_number: "", email_address: "" },
  customers: [],
  isLoading: false,
  fetch: {
    response: buildColResponse()
  },
  create: {
    isOpen: "",
    response: buildResponse()
  },
  update: {
    isOpen: "",
    response: buildResponse()
    },
    remove: {
    isOpen: "",
    response: buildResponse()
  }
}
const initialState = { ...defaultState }
const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    openModal: (state, action) => {
      if (action.payload == ModalType.CREATE) state.create.isOpen = true
      if (action.payload == ModalType.UPDATE) state.update.isOpen = true
      if (action.payload == ModalType.REMOVE) state.remove.isOpen = true
    },
    closeModal: (state, action) => {
      if (action.payload == ModalType.CREATE) state.create.isOpen = false
      if (action.payload == ModalType.UPDATE) state.update.isOpen = false
      if (action.payload == ModalType.REMOVE) state.remove.isOpen = false
    },
    setSq: (state, action) => {
      state.sq = action.payload
    },
    setCustomer: (state, action) => {
      state.customer = action.payload
    },
    setPending: (state) => {
      state.fetch.response = buildColResponse(ResponseStatus.PENDING)
    },
    setFulfilled: (state, action) => {
      state.fetch.response = buildColResponse(ResponseStatus.FULFILLED, action.payload)
    },
    setRejected: (state, action) => {
      state.fetch.response = buildColResponse(ResponseStatus.REJECTED, action.payload)
    },
    resetStates: (state) => {
      state.createApiResource = { ...defaultState.createApiResource }
      state.updateApiResource = { ...defaultState.updateApiResource }
      state.removeApiResource = { ...defaultState.removeApiResource }
    }
  },
  extraReducers: (builder) => {
    builder
    // Create
    .addCase(createCustomer.pending, (state) => {
      state.create.response = buildResponse(ResponseStatus.PENDING)
    })  
    .addCase(createCustomer.fulfilled, (state, action) =>  {
      state.create.response = buildResponse(ResponseStatus.FULFILLED, action.payload)
    })
    .addCase(createCustomer.rejected, (state, action) => {
      state.create.response = buildResponse(ResponseStatus.REJECTED, action.payload)
    })
    // Update
    .addCase(updateCustomer.pending, (state) => {
      state.update.response = buildResponse(ResponseStatus.PENDING)
    })
    .addCase(updateCustomer.fulfilled, (state, action) =>  {
      state.update.response = buildResponse(ResponseStatus.FULFILLED, action.payload)
    })
    .addCase(updateCustomer.rejected, (state, action) => {
      state.update.response = buildResponse(ResponseStatus.REJECTED, action.payload)
    })
    // remove
    .addCase(removeCustomer.pending, (state) => {
      state.remove.response = buildResponse(ResponseStatus.PENDING)
    })
    .addCase(removeCustomer.fulfilled, (state, action) =>  {
      state.remove.response = buildResponse(ResponseStatus.FULFILLED, action.payload)
    })
    .addCase(removeCustomer.rejected, (state, action) => {
      state.remove.response = buildResponse(ResponseStatus.REJECTED, action.payload)
    })
  }
})

export const { openModal, closeModal, setSq, setCustomer, setPending, setFulfilled, setRejected, resetStates } = customersSlice.actions
export { createCustomer, updateCustomer, removeCustomer }
export default customersSlice.reducer