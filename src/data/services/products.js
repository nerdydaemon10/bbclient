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
      invalidatesTags: (result) => {
        return result ? [tags] : []
      }
    }),
    updateProduct: builder.mutation({
      query: (product) => ({
        url: `/products/${product.id}`,
        method: "PATCH",
        body: product
      }),
      invalidatesTags: (result) => {
        return result ? [tags] : []
      }
    }),
    removeProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
        params: id
      }),
      invalidatesTags: (result) => {
        return result ? [tags] : []
      }
    }),
    fetchProducts: builder.query({
      query: (sq) => ({
        url: `/products`,
        method: "GET",
        params: params(sq)
      }),
      providesTags: tags
    }),
    fetchCriticalProducts: builder.query({
      query: (sq) => ({
        url: `/products`,
        method: "GET",
        params: params(sq),
      }),
      transformResponse: (response) => {
        return response.data.filter(product => product.quantity <= 60)
      },
      providesTags: tags
    })
  })
})

export const { 
  useCreateProductMutation,
  useUpdateProductMutation,
  useRemoveProductMutation,
  useFetchProductsQuery,
  useFetchCriticalProductsQuery
} = products
export default products