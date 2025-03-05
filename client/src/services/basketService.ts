import { API_URL } from "@/config/api.config"

import { IBasket } from "@/shared/types/basket.interface"

import { api } from "./api"

export const basketApi = api.injectEndpoints({
	endpoints: builder => ({
		getBasket: builder.query<IBasket, void>({
			query: () => ({
				url: API_URL.basket(""),
				method: "GET"
			})
		}),

		addProductsInBasket: builder.mutation<IBasket, string[]>({
			query: productsId => ({
				url: API_URL.basket(""),
				method: "POST",
				body: productsId
			})
		})
	})
})

export const { useGetBasketQuery, useAddProductsInBasketMutation } = basketApi
