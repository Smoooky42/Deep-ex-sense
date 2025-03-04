import { API_URL } from "@/config/api.config";
import { api } from "./api";
import { ITrack, ITrackInput } from "@/shared/types/track.interface";

export const trackApi = api.injectEndpoints({
    endpoints: (builder) => ({
        create: builder.mutation<ITrack, ITrackInput>({
            query: (data) => ({
                url: API_URL.track(""),
                method: "POST",
                body: data,
            })
        }),

        findAll: builder.query<ITrack[], {count: number, offset: number}>({
            query: ({count, offset}) => ({
                url: API_URL.track(`?count=${count}&offset=${offset}`),
                method: "GET"
            })
        }),

        findOne: builder.query<ITrack, void>({
            query: (id) => ({
                url: API_URL.track(`/${id}`),
                method: "GET"
            })
        }),

        search: builder.query<ITrack, string>({
            query: (query) => ({
                url: API_URL.track(`/search/query=${query}`),
                method: "GET"
            })
        }),

        update: builder.mutation<ITrack, Partial<ITrack> & Pick<ITrack, 'id'>>({
            query: ({id, ...data}) => ({
                url: API_URL.track(`/${id}`),
                method: "PATCH",
                body: data
            })
        }),

        delete: builder.mutation<boolean, void>({
            query: (id) => ({
                url: API_URL.track(`/${id}`),
                method: "DELETE"
            })
        }),

        listen: builder.query<boolean, string>({
            query: (id) => ({
                url: API_URL.track(`listen/${id}`),
                method: "GET"
            })
        }),
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
 } = trackApi;