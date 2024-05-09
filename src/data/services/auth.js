import client from "./client.js"
import Role from "../../util/classes/Role.js"

const auth = client.injectEndpoints({
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
        return result ? ["List"] : []
      }
    }),
    verify: builder.mutation({
      query: () => ({
        url: "/auth/verify",
        method: "GET"
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST"
      }),
      invalidatesTags: (result) => {
        return result ? ["List"] : []
      }
    }),
  })
})

export const { 
  useLoginMutation,
  useVerifyMutation,
  useLogoutMutation,
} = auth
export default auth