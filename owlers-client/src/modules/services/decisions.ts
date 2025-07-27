// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from "../../constants";

// Define a service using a base URL and expected endpoints
export const decisionsApi = createApi({
  reducerPath: 'decisionsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getDecisions: builder.query<any, string>({
      query: (walletAddress: string) => walletAddress ? `api/decisions?walletAddress=${walletAddress}` : `api/decisions`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLazyGetDecisionsQuery  } = decisionsApi;
export default decisionsApi.reducer