import { params } from "../../util/helper.js"
import client from "./client.js"

const tag = "Sales"
const tags = ["List", tag]

export const sales = client.injectEndpoints({
  endpoints: builder => ({
    downloadSales: builder.mutation({
      query: (sq) => ({
        url: `/admin/export`,
        method: "GET",
        params: sq,
        responseHandler: async (response) => await response.blob(),
        cache: "no-cache",
      })
    }),
    fetchSales: builder.query({
      query: (sq) => ({
        url: `/admin/filter/sales`,
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