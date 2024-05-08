import client from "./client.js"

const tag = "Summary"
const tags = ["List", tag]

export const summaries = client.injectEndpoints({
  endpoints: builder => ({
    fetchSummaries: builder.query({
      query: () => `/admin/summary`,
      providesTags: tags
    })
  })
})

export const {
  useFetchSummariesQuery,
} = summaries