import { API_URL } from "@/config/api.config";
import { api } from "./api";
import { IRole, IRoleInput } from "@/shared/types/role.interface";


export const rolesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        create: builder.mutation<IRole, IRoleInput>({
            query: (data) => ({
                url: API_URL.roles(""),
                method: "POST",
                body: data
            })
        }),

        findAll: builder.query<IRole[], void>({
            query: () => ({
                url: API_URL.roles(""),
                method: "GET",
            })
        }),

        remove: builder.query<IRole, IRoleInput>({
            query: (id) => ({
                url: API_URL.roles(`/${id}`),
                method: "DELETE"
            })
        }),
    })
})

export const {useCreateMutation, useFindAllQuery, useRemoveQuery } = rolesApi