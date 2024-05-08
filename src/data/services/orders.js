import { isEmpty } from "lodash"
import { params } from "../../util/helper.jsx"
import client from "./client.js"

const tag = "Order"
const tags = ["List", tag]

const orders = client.injectEndpoints({
  endpoints: builder => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: `/orders`,
        method: "POST",
        body: order
      }),
      invalidatesTags: (result) => {
        return result ? [tag] : []
      }
    }),
    approveOrder: builder.mutation({
      query: (id) => ({
        url: `/admin/order/approve/${id}`,
        method: "PATCH"
      }),
      invalidatesTags: (result) => {
        return result ? [tag] : []
      }
    }),
    rejectOrder: builder.mutation({
      query: (id) => ({
        url: `/admin/order/reject/${id}`,
        method: "PATCH"
      }),
      invalidatesTags: (result) => {
        return result ? [tag] : []
      }
    }),
    fetchOrders: builder.query({
      query: (sq, role="") => ({
        url: isEmpty(role) ? `/orders` : `/${role}/orders`,
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