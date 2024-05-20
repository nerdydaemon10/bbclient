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
      invalidatesTags: (result) => {
        return result ? [tag, "Sales", "Summary", "Chart_Sales"] : []
      }
    }),
    approveOrder: builder.mutation({
      query: (id) => ({
        url: `/admin/order/approve/${id}`,
        method: "PATCH"
      }),
      invalidatesTags: (result) => {
        return result ? [tag, "Sales", "Summary", "Chart_Sales"] : []
      }
    }),
    rejectOrder: builder.mutation({
      query: (id) => ({
        url: `/admin/order/reject/${id}`,
        method: "PATCH"
      }),
      invalidatesTags: (result) => {
        return result ? [tag, "Sales", "Summary", "Chart_Sales"] : []
      }
    }),
    fetchOrders: builder.query({
      query: (sq) => ({
        url: roleBaseUrl("/orders"),
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