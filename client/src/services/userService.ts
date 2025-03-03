import {api} from './api'

// Define a service using a base URL and expected endpoints
export const userApi = api.injectEndpoints({
	endpoints: (builder) => ({
		fetchAllUsers: builder.query<string, string>({
			query: (name) => `/users/${name}`,
		}),
	}),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useFetchAllUsersQuery } = userApi