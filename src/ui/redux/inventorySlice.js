import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import ProductService from "../../data/services/ProductService.jsx"
import { ProductCategoriesData, rowsPerPages } from "../../util/Config.jsx"
import ModalType from "../../util/classes/ModalType.jsx"

const createProductAsync = createAsyncThunk(
  "inventory/createProductAsync", 
  async (param, thunkAPI) => {
    try {
      const response = await ProductService.create(param)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
})
const removeProductAsync = createAsyncThunk(
  "inventory/removeProductAsync", 
  async (id, thunkAPI) => {
    try {
      const response = await ProductService.remove(id)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
})
const updateProductAsync = createAsyncThunk(
  "inventory/updateProductAsync", 
  async (product, thunkAPI) => {
    try {
        const response = await ProductService.update(product)
        return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
})

const defaultState = {
  isCreateModalOpen: false,
  isUpdateModalOpen: false,
  isRemoveModalOpen: false,
  searchQuery: { name: "", category_id: "", per_page: rowsPerPages[0].id, page: 1 },
  product: { name: "", description: "", category_id: ProductCategoriesData[0].id, quantity: "", srp: "", member_price: "" },
  createApiResource: { isLoading: false, isSuccess: false, data: null, error: null},
  updateApiResource: { isLoading: false, isSuccess: false, data: null, error: null},
  removeApiResource: { isLoading: false, isSuccess: false, data: null, error: null}
}
const initialState = { ...defaultState }

const inventorySlice = createSlice({
  name: "inventory",
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
    setProduct: (state, action) => {
      state.product = action.payload
    },
    resetStates: (state) => {
      state.createApiResource = { ...defaultState.createApiResource }
      state.updateApiResource = { ...defaultState.updateApiResource }
      state.removeApiResource = { ...defaultState.removeApiResource }
    }
  },
  extraReducers: (builder) => {
    builder
    // Create Product
    .addCase(createProductAsync.pending, (state) => {
      state.createApiResource = {
        isLoading: true,
        isSuccess: false,
        data: null,
        error: null 
      }
    })
    .addCase(createProductAsync.fulfilled, (state, action) =>  {
      state.createApiResource = {
        ...state.createApiResource,
        isLoading: false,
        isSuccess: true,
        data: action.payload
      }
    })
    .addCase(createProductAsync.rejected, (state, action) => {
      state.createApiResource = { 
        ...state.createApiResource,
        isLoading: false,
        error: action.payload
      }
    })
    // Update Product
    .addCase(updateProductAsync.pending, (state) => {
      state.updateApiResource = {
        isLoading: true,
        isSuccess: false,
        data: null,
        error: null 
      }
    })
    .addCase(updateProductAsync.fulfilled, (state, action) =>  {
      state.updateApiResource = {
        ...state.updateApiResource,
        isLoading: false,
        isSuccess: true,
        data: action.payload
      }
    })
    .addCase(updateProductAsync.rejected, (state, action) => {
      state.updateApiResource = { 
        ...state.updateApiResource,
        isLoading: false,
        error: action.payload
      }
    })
    // Remove Product
    .addCase(removeProductAsync.pending, (state) => {
      state.removeApiResource = {
        isLoading: true,
        isSuccess: false,
        data: null,
        error: null 
      }
    })
    .addCase(removeProductAsync.fulfilled, (state, action) =>  {
      state.removeApiResource = {
        ...state.removeApiResource,
        isLoading: false,
        isSuccess: true,
        data: action.payload
      }
    })
    .addCase(removeProductAsync.rejected, (state, action) => {
      state.removeApiResource = {
        ...state.removeApiResource,
        isLoading: false,
        error: action.payload
      }
    })
  }
})

export const { toggleModal, setSearchQuery, setProduct, resetStates } = inventorySlice.actions
export { createProductAsync, updateProductAsync, removeProductAsync }
export default inventorySlice.reducer