import { isNil } from "lodash"
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
      invalidatesTags: (result, error, arg) => {
        return isNil(error) ? tags : []
      }
    }),
    updateCustomer: builder.mutation({
      query: (customer) => ({
        url: `/customers/${customer.id}`,
        method: "PATCH",
        body: customer
      }),
      invalidatesTags: (result, error, arg) => {
        return isNil(error) ? tags : []
      }
    }),
    removeCustomer: builder.mutation({
      query: (id) => ({
        url: `/customers/${id}`,
        method: "DELETE",
        params: id
      }),
      invalidatesTags: (result, error, arg) => {
        return isNil(error) ? tags : []
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