import { API_URL } from "@/config/api.config";
import { api } from "./api";
import { ICategory, ICategoryInput } from "@/shared/types/category.interface";

export const categoryApi = api.injectEndpoints({
    endpoints: (builder) => ({
        create: builder.mutation<ICategory, ICategoryInput>({
            query: (data) => ({
                url: API_URL.categories(""),
                method: "POST",
                body: data,
            })
        }),

        findAll: builder.query<ICategory[], void>({
            query: () => ({
                url: API_URL.categories(""),
                method: "GET"
            })
        }),

        findOne: builder.query<ICategory, void>({
            query: (id) => ({
                url: API_URL.categories(`/${id}`),
                method: "GET"
            })
        }),

        update: builder.mutation<ICategory, Partial<ICategory> & Pick<ICategory, 'id'>>({
            query: ({id, ...data}) => ({
                url: API_URL.categories(`/${id}`),
                method: "PATCH",
                body: data
            })
        }),

        delete: builder.mutation<boolean, void>({
            query: (id) => ({
                url: API_URL.categories(`/${id}`),
                method: "DELETE"
            })
        })
    })
})

export const { useCreateMutation, useFindAllQuery, useFindOneQuery, useDeleteMutation, useUpdateMutation } = categoryApi;