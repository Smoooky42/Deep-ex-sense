import { API_URL } from "@/config/api.config";
import { api } from "./api";
import { IProduct, IProductInfo, IProductInfoInput, IProductInput } from "@/shared/types/product.interface";


export const productsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        create: builder.mutation<IProduct, IProductInput>({
            query: (data) => ({
                url: API_URL.products(""),
                method: "POST",
                body: data
            })
        }),

        findAll: builder.query<IProduct[], void>({
            query: () => ({
                url: API_URL.products(""),
                method: "GET",
            })
        }),

        search: builder.query<IProduct[], void>({
            query: (query) => ({
                url: API_URL.products(`search?query=${query}`),
                method: "GET",
            })
        }),

        findByCategory: builder.query<IProduct[], void>({
            query: (categoryId) => ({
                url: API_URL.products(`by-category/${categoryId}`),
                method: "GET",
            })
        }),

        update: builder.mutation<IProduct, Partial<IProduct> & Pick<IProduct, 'id'>>({
            query: (id, ...data) => ({
                url: API_URL.products(`/${id}`),
                method: "PATCH",
                body: data
            })
        }),

        remove: builder.query<IProduct[], void>({
            query: (id) => ({
                url: API_URL.products(`/${id}`),
                method: "DELETE",
            })
        }),

        createProductsInfo: builder.mutation<IProductInfo, IProductInfoInput>({
            query: (data) => ({
                url: API_URL.products("/productInfo"),
                method: "POST",
                body: data
            })
        }),

        updateProductsInfo: builder.mutation<IProductInfo, Partial<IProductInfo> & Pick<IProductInfo, 'id'>>({
            query: (id, ...data) => ({
                url: API_URL.products(`/productInfo/${id}`),
                method: "PATCH",
                body: data
            })
        }),

        removeProductInfo: builder.query<boolean, void>({
            query: (id) => ({
                url: API_URL.products(`/${id}`),
                method: "DELETE",
            })
        }),
    })
})

export const { 
    useCreateMutation, 
    useFindAllQuery ,
    useFindByCategoryQuery,
    useCreateProductsInfoMutation,
    useUpdateMutation,
    useRemoveQuery,
    useRemoveProductInfoQuery,
    useSearchQuery,
    useUpdateProductsInfoMutation
} = productsApi