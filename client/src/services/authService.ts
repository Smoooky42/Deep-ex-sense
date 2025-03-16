import { API_URL } from "@/config/api.config"

import { IAuthInput, IAuthResponse } from "@/shared/types/auth.interface"

import { api } from "./api"

export const authApi = api.injectEndpoints({
	endpoints: builder => ({
		login: builder.mutation<IAuthResponse, IAuthInput>({
			query: userData => ({
				url: API_URL.auth("/login"),
				method: "POST",
				body: userData
			})
		}),
		register: builder.mutation<IAuthResponse, IAuthInput>({
			query: userData => ({
				url: API_URL.auth("/register"),
				method: "POST",
				body: userData
			})
		}),
		refresh: builder.query<IAuthResponse, void>({
			query: () => ({
				url: API_URL.auth("/refresh"),
				method: "GET"
			})
		}),
		logout: builder.query<boolean, void>({
			query: () => ({
				url: API_URL.auth("/logout"),
				method: "GET"
			})
		})
	})
})

export const {
	useRegisterMutation,
	useLoginMutation,
	useRefreshQuery,
	useLogoutQuery
} = authApi
