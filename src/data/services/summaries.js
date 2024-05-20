import { params } from "../../util/helper.js"
import client, { roleBaseUrl } from "./client.js"

export const summaries = client.injectEndpoints({
  endpoints: builder => ({
    fetchSummaries: builder.query({
      query: (sq) => ({
        url: roleBaseUrl("/summary"),
        params: params(sq)
      }),
      providesTags: ["List", "Summary"]
    }),
    fetchSummariesSales: builder.query({
      query: (sq) => ({ 
       url: roleBaseUrl("/chart/sales"),
       params: params(sq)
      }),
      providesTags: ["List", "Chart_Sales"],
    }),
    fetchSummariesProducts: builder.query({
      query: (sq) => ({ 
       url: roleBaseUrl("/chart/products"),
       params: params(sq)
      }),
      providesTags: ["List", "Chart_Products"],
    })
  })
})

export const {
  useFetchSummariesQuery,
  useFetchSummariesSalesQuery,
  useFetchSummariesProductsQuery
} = summaries