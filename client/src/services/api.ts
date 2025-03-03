import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react"

const baseQuery = fetchBaseQuery({
	baseUrl: process.env.SERVER_URL,
})

const baseQueryWithRetry = retry(baseQuery, {maxRetries: 1})

export const api = createApi({
	reducerPath: "splitApi",
	baseQuery: baseQueryWithRetry,
	refetchOnMountOrArgChange: false,
	endpoints: (builder) => ({})
})