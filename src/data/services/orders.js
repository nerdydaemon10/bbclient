import { isNil } from "lodash"
import { params } from "../../util/helper.js"
import client, { roleBaseUrl } from "./client.js"

const tag = "Order"
const tags = ["List", tag]

const orders = client.injectEndpoints({
  endpoints: builder => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: roleBaseUrl(`/orders`),
        method: "POST",
        body: order
      }),
      invalidatesTags: (result, error, arg) => {
        return isNil(error) ? tags : []
      }
    }),
    approveOrder: builder.mutation({
      query: (id) => ({
        url: `/admin/order/approve/${id}`,
        method: "PATCH"
      }),
      invalidatesTags: (result, error, arg) => {
        return isNil(error) ? tags : []
      }
    }),
    rejectOrder: builder.mutation({
      query: (id) => ({
        url: `/admin/order/reject/${id}`,
        method: "PATCH"
      }),
      invalidatesTags: (result, error, arg) => {
        return isNil(error) ? tags : []
      }
    }),
    fetchOrders: builder.query({
      query: (sq) => ({
        url: roleBaseUrl("/filter/orders"),
        method: "GET",
        params: params(sq)
      }),
      providesTags: tags
    })
  })
})

export const { 
  useCreateOrderMutation,
  useApproveOrderMutation,
  useRejectOrderMutation,
  useFetchOrdersQuery,
} = orders
export default orders