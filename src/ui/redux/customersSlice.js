import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import ModalType from "../../util/classes/ModalType.jsx"
import { CustomerService } from "../../data/services"
import { rowsPerPages } from "../../util/Config.jsx"

const createCustomerAsync = createAsyncThunk(
  "customers/createCustomerAsync", async (param, thunkAPI) => {
  try {
    const response = await CustomerService.create(param)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})
const updateCustomerAsync = createAsyncThunk(
  "customers/updateCustomerAsync", 
  async (customer, thunkAPI) => {
    try {
      const response = await CustomerService.update(customer)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
})
const removeCustomerAsync = createAsyncThunk(
  "customers/removeCustomerAsync", 
  async (id, thunkAPI) => {
    try {
      const response = await CustomerService.remove(id)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
})

const defaultState = {
  isCreateModalOpen: false,
  isUpdateModalOpen: false,
  isRemoveModalOpen: false,
  searchQuery: { full_name: "", category_id: "", per_page: rowsPerPages[0].id, page: 1 },
  customer: { id: 0, full_name: "", address: "", phone_number: "", email_address: "" },
  createApiResource: { isLoading: false, isSuccess: false, data: null, error: null},
  updateApiResource: { isLoading: false, isSuccess: false, data: null, error: null},
  removeApiResource: { isLoading: false, isSuccess: false, data: null, error: null}
}
const initialState = { ...defaultState }

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      const { modalType, open } = action.payload

      if (modalType == ModalType.CREATE) {
        state.isCreateModalOpen = open
      }
      if (modalType == ModalType.UPDATE) {
        state.isUpdateModalOpen = open
      }
      if (modalType == ModalType.REMOVE) {
        state.isRemoveModalOpen = open
      }
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    setCustomer: (state, action) => {
      state.customer = action.payload
    },
    resetStates: (state) => {
      state.createApiResource = { ...defaultState.createApiResource }
      state.updateApiResource = { ...defaultState.updateApiResource }
      state.removeApiResource = { ...defaultState.removeApiResource }
    }
  },
  extraReducers: (builder) => {
    builder
    // create
    .addCase(createCustomerAsync.pending, (state) => {
      state.createApiResource = {
        isLoading: true,
        isSuccess: false,
        data: null,
        error: null 
      }
    })  
    .addCase(createCustomerAsync.fulfilled, (state, action) =>  {
      state.createApiResource = {
        isLoading: false,
        isSuccess: true,
        data: action.payload,
        error: null
      }
    })
    .addCase(createCustomerAsync.rejected, (state, action) => {
      state.createApiResource = { 
        isLoading: false,
        isSuccess: false,
        data: null,
        error: action.payload
      }
    })
    // update
    .addCase(updateCustomerAsync.pending, (state) => {
      state.updateApiResource = {
        isLoading: true,
        isSuccess: false,
        data: null,
        error: null 
      }
    })
    .addCase(updateCustomerAsync.fulfilled, (state, action) =>  {
      state.updateApiResource = {
        ...state.updateApiResource,
        isLoading: false,
        isSuccess: true,
        data: action.payload
      }
    })
    .addCase(updateCustomerAsync.rejected, (state, action) => {
      state.updateApiResource = { 
        ...state.updateApiResource,
        isLoading: false,
        error: action.payload
      }
    })
    // remove
    .addCase(removeCustomerAsync.pending, (state) => {
      state.removeApiResource = {
        isLoading: true,
        isSuccess: false,
        data: null,
        error: null 
      }
    })
    .addCase(removeCustomerAsync.fulfilled, (state, action) =>  {
      state.removeApiResource = {
        ...state.removeCustomerAsync,
        isLoading: false,
        isSuccess: true,
        data: action.payload
      }
    })
    .addCase(removeCustomerAsync.rejected, (state, action) => {
      state.removeApiResource = { 
        ...state.removeCustomerAsync,
        isLoading: false,
        error: action.payload
      }
    })
  }
})

export const { toggleModal, setSearchQuery, setCustomer, resetStates } = customersSlice.actions
export { createCustomerAsync, updateCustomerAsync, removeCustomerAsync }
export default customersSlice.reducer