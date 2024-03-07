import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import ProductService from "../../services/ProductService.jsx"
import UiStatus from "../../utils/classes/UiStatus.jsx"
import DateHelper from "../../utils/helpers/DateHelper.jsx"
import StringHelper from "../../utils/helpers/StringHelper.jsx"
import ProductCategories from "../../utils/data/ProductCategories.jsx"

// state
const initialState = {
  fetch: {
    products: [],
    status: UiStatus.LOADING,
    error: null
  },
  create: {
    status: UiStatus.IDLE,
    error: null
  },
  update: {
    status: UiStatus.IDLE,
    message: "",
    error: null
  },
  remove: {
    status: UiStatus.IDLE,
    message: "",
    error: null
  },
  param: {
    name: "", description: "",
    category_id: ProductCategories[0].id,
    quantity: "", srp: "", member_price: ""
  },
  product: null,
  isCreateModalOpen: false,
  isUpdateModalOpen: false,
  isRemoveModalOpen: false
}

// async functions
const fetchProducts = createAsyncThunk(
  "inventory/fetchProducts", 
  async (thunkAPI) => {
  try {
    const response = await ProductService.findAll()
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})
const createProduct = createAsyncThunk(
  "inventory/createProduct", 
  async (product, thunkAPI) => {
    try {
        const response = await ProductService.create(product)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})
const removeProduct = createAsyncThunk(
  "inventory/removeProduct", 
  async (product, thunkAPI) => {
    try {
        const response = await ProductService.remove(product.id)
        return response
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

// core
const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    toggleCreateModal: (state, action) => {
      state.isCreateModalOpen = action.payload
    },
    toggleUpdateModal: (state, action) => {
      const { product, isOpen } = action.payload
      
      state.product = product == undefined ? state.product : product
      state.isUpdateModalOpen = isOpen
    },
    toggleRemoveModal: (state, action) => {
      const { product, isOpen } = action.payload

      state.product = product == undefined ? state.product : product
      state.isRemoveModalOpen = isOpen
    },
    changeParam: (state, action) => {
      state.param = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchProducts.pending, (state) => {
        state.fetch.status = UiStatus.LOADING
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.fetch.status = action.payload.length > 0 ? UiStatus.IDLE : UiStatus.EMPTY
        state.fetch.products = action.payload.map((item) => {
          return {
            ...item,
            name: StringHelper.truncate(item.name),
            category: "Test",
            description: StringHelper.truncate(item.name),
            created_at: DateHelper.display(item.created_at),
            updated_at: DateHelper.display(item.updated_at)
          }
        })
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.fetch.status = UiStatus.ERROR
        state.fetch.error = action.payload
      })
      // create
      .addCase(createProduct.pending, (state) => {
        state.create.status = UiStatus.LOADING
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.create.status = UiStatus.SUCCESS
        state.fetch.status = UiStatus.LOADING // re-fetch products
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.create.status = UiStatus.ERROR
        state.create.error = action.payload

        setTimeout(() => state.create.status = UiStatus.IDLE, 500)
      })
      // remove
      .addCase(removeProduct.pending, (state) => {
        state.remove.status = UiStatus.LOADING
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        const { message } = action.payload

        state.product = null // remove temp product

        state.remove.status = UiStatus.SUCCESS
        state.remove.message = message

        state.fetch.status = UiStatus.LOADING //re-fetch products

        setTimeout(() => state.remove.status = UiStatus.IDLE, 500)
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.remove.status = UiStatus.ERROR
        state.remove.error = action.payload
      })
  }
})

export const { toggleCreateModal, toggleRemoveModal, toggleUpdateModal, changeParam } = inventorySlice.actions
export { fetchProducts, createProduct, removeProduct }
export default inventorySlice.reducer