import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react"

const baseQuery = fetchBaseQuery({
	baseUrl: process.env.SERVER_URL,
	prepareHeaders: (headers, { getState }) => {
		const accessToken = localStorage.getItem("token")

		if (accessToken) {
			headers.set("authorization", `Bearer ${accessToken}`)
		}
		return headers
	}
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 })

export const api = createApi({
	reducerPath: "Api",
	baseQuery: baseQueryWithRetry,
	refetchOnMountOrArgChange: false,
	endpoints: () => ({})
})
