import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import local from "../../util/local.js"

const X_API_KEY = import.meta.env.VITE_X_API_KEY
const BASE_URL = import.meta.env.VITE_BASE_URL

const tags = ["List", "Employee", "Customer", "Summary", "Chart", "Product", "Sales", "Order"]

const client = createApi({
  reducerPath: "client",
  baseQuery: fetchBaseQuery({ 
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = local.get("token")

      headers.set("Accept", "application/json")
      headers.set("x-api-key", X_API_KEY)
      headers.set("Authorization", `Bearer ${token}`)
      headers.set("token", token)
    }
  }),
  tagTypes: tags,
  endpoints: () => ({})
})

export default client