import { params } from "../../util/helper.jsx"
import client from "./client.js"

export const customers = client.injectEndpoints({
  endpoints: builder => ({
    createCustomer: builder.mutation({
      query: (customer) => ({
        url: `/customers`,
        method: "POST",
        body: customer
      }),
      invalidatesTags: (result) => {
        return result ? ['Customer'] : []
      }
    }),
    updateCustomer: builder.mutation({
      query: (customer) => ({
        url: `/customers/${customer.id}`,
        method: "PATCH",
        body: customer
      }),
      invalidatesTags: (result) => {
        return result ? ['Customer'] : []
      }
    }),
    removeCustomer: builder.mutation({
      query: (id) => ({
        url: `/customers/${id}`,
        method: "DELETE",
        params: id
      }),
      invalidatesTags: (result) => {
        return result ? ['Customer'] : []
      }
    }),
    fetchCustomers: builder.query({
      query: (sq) => ({
        url: `/customers`,
        method: "GET",
        params: params(sq)
      }),
      providesTags: ["Customer"]
    })
  })
})

export const {
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useRemoveCustomerMutation,
  useFetchCustomersQuery,
} = customers