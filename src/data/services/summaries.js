import { params } from "../../util/helper.js"
import client from "./client.js"

export const summaries = client.injectEndpoints({
  endpoints: builder => ({
    fetchSummaries: builder.query({
      query: () => `/admin/summary`,
      providesTags: ["List", "Summary"]
    }),
    fetchChart: builder.query({
      query: (sq) => ({ 
       url: `/admin/chart/sales`,
       params: params(sq)
      }),
      providesTags: ["List", "Chart"],
    })
  })
})

export const {
  useFetchSummariesQuery,
  useFetchChartQuery
} = summaries