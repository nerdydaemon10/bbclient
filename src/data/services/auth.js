import client from "./client.js"
import Role from "../../util/classes/Role.js"

export const auth = client.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response) => {
        const { token, user } = response
        const { role_id, last_login_at, last_logout_at, ...normalized } = user
        
        normalized.role = Role.toNormalize(role_id)
        normalized.login_at = last_login_at
        normalized.logout_at = last_logout_at

        return { token: token, user: normalized }
      },
      invalidatesTags: (result) => {
        return result ? ["Employee", "Customer", "Summary"] : []
      }
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: (result) => {
        return result ? ["Employee", "Customer", "Summary"] : []
      }
    }),
  })
})

export const { 
  useLoginMutation,
  useLogoutMutation
} = auth