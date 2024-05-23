import { isNil } from "lodash"
import { params } from "../../util/helper.js"
import client from "./client.js"

const tag = "Product"
const tags = ["List", tag]

const products = client.injectEndpoints({
  endpoints: builder => ({
    createProduct: builder.mutation({
      query: (product) => ({
        url: `/products`,
        method: "POST",
        body: product
      }),
      invalidatesTags: (result, error, arg) => {
        return isNil(error) ? tags : []
      }
    }),
    updateProduct: builder.mutation({
      query: (product) => ({
        url: `/products/${product.id}`,
        method: "PATCH",
        body: product
      }),
      invalidatesTags: (result, error, arg) => {
        return isNil(error) ? tags : []
      }
    }),
    removeProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
        params: id
      }),
      invalidatesTags: (result, error, arg) => {
        return isNil(error) ? tags : []
      }
    }),
    fetchProducts: builder.query({
      query: (sq) => ({
        url: `/products`,
        method: "GET",
        params: params(sq)
      }),
      providesTags: ["Product"]
    })
  })
})

export const { 
  useCreateProductMutation,
  useUpdateProductMutation,
  useRemoveProductMutation,
  useFetchProductsQuery
} = products
export default products