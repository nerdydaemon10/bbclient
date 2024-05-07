import { params } from "../../util/helper.jsx"
import client from "./client.js"

export const employees = client.injectEndpoints({
  endpoints: builder => ({
    createEmployee: builder.mutation({
      query: (employee) => ({
        url: `/users`,
        method: "POST",
        body: employee
      }),
      invalidatesTags: (result) => {
        return result ? ["Employee"] : []
      }
    }),
    updateEmployee: builder.mutation({
      query: (employee) => ({
        url: `/users/${employee.id}`,
        method: "PATCH",
        body: employee
      }),
      invalidatesTags: (result) => {
        return result ? ["Employee"] : []
      }
    }),
    removeEmployee: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
        params: id
      }),
      invalidatesTags: (result) => {
        return result ? ["Employee"] : []
      }
    }),
    fetchEmployees: builder.query({
      query: (sq) => ({
        url: `/users`,
        method: "GET",
        params: params(sq)
      }),
      providesTags: ["Employee"]
    })
  })
})

export const { 
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useRemoveEmployeeMutation,
  useFetchEmployeesQuery,
} = employees