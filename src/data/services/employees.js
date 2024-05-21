import { params } from "../../util/helper.js"
import client from "./client.js"

const tag = "Employee"
const tags = ["List", tag]

export const employees = client.injectEndpoints({
  endpoints: builder => ({
    createEmployee: builder.mutation({
      query: (employee) => ({
        url: `/users`,
        method: "POST",
        body: employee
      }),
      invalidatesTags: (result) => {
        return result ? [tag] : []
      }
    }),
    updateEmployee: builder.mutation({
      query: (employee) => ({
        url: `/users/${employee.id}`,
        method: "PATCH",
        body: employee
      }),
      invalidatesTags: (result) => {
        return result ? [tag] : []
      }
    }),
    removeEmployee: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
        params: id
      }),
      invalidatesTags: (result) => {
        return result ? [tag] : []
      }
    }),
    fetchEmployees: builder.query({
      query: (sq) => ({
        url: `/admin/filter/employees`,
        method: "GET",
        params: params(sq)
      }),
      providesTags: tags
    })
  })
})

export const { 
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useRemoveEmployeeMutation,
  useFetchEmployeesQuery,
} = employees