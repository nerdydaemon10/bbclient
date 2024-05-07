import { params } from "../../util/helper.jsx"
import { client } from "./client.js"

export const employees = client.injectEndpoints({
  endpoints: builder => ({
    createEmployee: builder.mutation({
      query: (employee) => ({
        url: `/users`,
        method: "POST",
        body: employee
      }),
      invalidatesTags: (result) => {
        return result ? ['Employees'] : []
      }
    }),
    updateEmployee: builder.mutation({
      query: (employee) => ({
        url: `/users/${employee.id}`,
        method: "PATCH",
        body: employee
      }),
      invalidatesTags: (result) => {
        return result ? ['Employees'] : []
      }
    }),
    removeEmployee: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
        params: id
      }),
      invalidatesTags: (result) => {
        return result ? ['Employees'] : []
      }
    }),
    fetchEmployees: builder.query({
      query: (sq) => ({
        url: `/users`,
        method: "GET",
        params: params(sq)
      }),
      providesTags: ["Employees"]
    })
  })
})

export const { 
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useRemoveEmployeeMutation,
  useFetchEmployeesQuery,
} = employees