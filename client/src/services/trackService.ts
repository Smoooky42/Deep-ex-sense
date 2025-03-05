import { API_URL } from "@/config/api.config"

import { ITrack, ITrackInput } from "@/shared/types/track.interface"

import { api } from "./api"

export const trackApi = api.injectEndpoints({
	endpoints: builder => ({
		create: builder.mutation<ITrack, ITrackInput>({
			query: data => ({
				url: API_URL.track(""),
				method: "POST",
				body: data
			})
		}),

		findAll: builder.query<ITrack[], { count: number; offset: number }>({
			query: ( { count = 10, offset = 1 } ) => ({
				url: API_URL.track(""),
				method: "GET",
				params: { _count: count, _offset: offset }
			})
		}),

		findOne: builder.query<ITrack, string>({
			query: id => ({
				url: API_URL.track(`/${id}`),
				method: "GET"
			})
		}),

		search: builder.query<ITrack, string | null>({
			query: (query = null) => ({
				url: API_URL.track(`/search`),
				method: "GET",
				params: { _query: query }
			})
		}),

		update: builder.mutation<ITrack, Partial<ITrack> & Pick<ITrack, "id">>({
			query: ({ id, ...data }) => ({
				url: API_URL.track(`/${id}`),
				method: "PATCH",
				body: data
			})
		}),

		delete: builder.mutation<boolean, string>({
			query: id => ({
				url: API_URL.track(`/${id}`),
				method: "DELETE"
			})
		}),

		listen: builder.query<boolean, string>({
			query: id => ({
				url: API_URL.track(`listen/${id}`),
				method: "GET"
			})
		})
	})
})

export const {
	useCreateMutation,
	useDeleteMutation,
	useFindAllQuery,
	useFindOneQuery,
	useSearchQuery,
	useUpdateMutation,
	useListenQuery
} = trackApi
