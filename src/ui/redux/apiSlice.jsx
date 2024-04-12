import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/`

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL}),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "products"
    })
  })
})

export const { useGetAllProductsQuery } = productsApi