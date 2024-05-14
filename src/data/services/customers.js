import { params } from "../../util/helper.js"
import client from "./client.js"

const tag = "Customer"
const tags = ["List", tag]

export const customers = client.injectEndpoints({
  endpoints: builder => ({
    createCustomer: builder.mutation({
      query: (customer) => ({
        url: `/customers`,
        method: "POST",
        body: customer
      }),
      invalidatesTags: (result) => {
        return result ? [tag] : []
      }
    }),
    updateCustomer: builder.mutation({
      query: (customer) => ({
        url: `/customers/${customer.id}`,
        method: "PATCH",
        body: customer
      }),
      invalidatesTags: (result) => {
        return result ? [tag] : []
      }
    }),
    removeCustomer: builder.mutation({
      query: (id) => ({
        url: `/customers/${id}`,
        method: "DELETE",
        params: id
      }),
      invalidatesTags: (result) => {
        return result ? [tag] : []
      }
    }),
    fetchCustomers: builder.query({
      query: (sq) => ({
        url: `/customers`,
        method: "GET",
        params: params(sq)
      }),
      providesTags: tags
    })
  })
})

export const {
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useRemoveCustomerMutation,
  useFetchCustomersQuery,
} = customers