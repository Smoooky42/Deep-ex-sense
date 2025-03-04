import { API_URL } from "@/config/api.config";
import { api } from "./api";


export const filesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        saveFiles: builder.mutation<string[], FormData>({
            query: (file: FormData) => ({
                url: API_URL.files(""),
                method: "POST",
                body: file
            })
        }),

        deleteFiles: builder.mutation<string[], string[]>({
            query: (productsId) => ({
                url: API_URL.files(""),
                method: "POST",
                body: productsId
            })
        }),
    })
})

export const { useSaveFilesMutation, useDeleteFilesMutation } = filesApi