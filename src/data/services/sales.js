import { params } from "../../util/helper.jsx"
import client from "./client.js"

const tag = "Sales"
const tags = ["List", tag]

export const sales = client.injectEndpoints({
  endpoints: builder => ({
    downloadSales: builder.mutation({
      query: (sq) => ({
        url: `/admin/export`,
        method: "GET",
        params: sq
      })
    }),
    fetchSales: builder.query({
      query: (sq) => ({
        url: `/admin/sales`,
        method: "GET",
        params: params(sq)
      }),
      providesTags: tags
    })
  })
})

export const {
  useDownloadSalesMutation,
  useFetchSalesQuery
} = sales