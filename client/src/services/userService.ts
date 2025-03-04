import { API_URL } from "@/config/api.config";
import { api } from "./api";
import { IAddRole, IUser } from "@/shared/types/user.interface";

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        
        findAll: builder.query<IUser[], void>({
            query: () => ({
                url: API_URL.user(""),
                method: "GET"
            })
        }),

        findOne: builder.query<IUser, void>({
            query: (id) => ({
                url: API_URL.user(`/${id}`),
                method: "GET"
            })
        }),

        addRole: builder.mutation<boolean, IAddRole>({
            query: (data) => ({
                url: API_URL.user("/role"),
                method: "POST",
                body: data,
            })
        }),

        
    })
})

export const { useAddRoleMutation, useFindAllQuery, useFindOneQuery } = userApi;