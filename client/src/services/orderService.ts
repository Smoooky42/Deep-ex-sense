import { API_URL } from "@/config/api.config"

import {
	EnumOrderStatus,
	IPaymentResponse
} from "@/shared/types/order.interface"

import { api } from "./api"

type TypeData = {
	status?: EnumOrderStatus
	items: {
		quantity: number
		price: number
		productId: string
	}[]
}

export const orderApi = api.injectEndpoints({
	endpoints: builder => ({
		create: builder.mutation<TypeData, IPaymentResponse>({
			query: data => ({
				url: API_URL.order("/create"),
				method: "POST",
				body: data
			})
		})
	})
})

export const { useCreateMutation } = orderApi
