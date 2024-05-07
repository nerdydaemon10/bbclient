import client from "./client.js"

export const summaries = client.injectEndpoints({
  endpoints: builder => ({
    fetchSummaries: builder.query({
      query: () => `/admin/summary`,
      invalidatesTags: (result) => {
        return result ? ['Summary'] : []
      } 
    })
  })
})

export const {
  useFetchSummariesQuery,
} = summaries