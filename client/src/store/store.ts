import { combineReducers, configureStore, createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit"
import { api } from "@/services/api"
import { authApi } from "@/services/authService"
import authReducer from "./reducers/authSlice"
import orderItemReducer from "./reducers/orderItemSlice"

const rootReducer = combineReducers({
	auth: authReducer,
	orderItem: orderItemReducer,
	[api.reducerPath]: api.reducer
})

export const makeStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(api.middleware).prepend(listenerMiddleware.middleware)
	})
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']


const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
	matcher: isAnyOf(
		authApi.endpoints.login.matchFulfilled,
		authApi.endpoints.register.matchFulfilled,
		authApi.endpoints.refresh.matchFulfilled
	),
	effect: async (action: any, listenerApi) => {
		// listenerApi.cancelActiveListeners()

		if (action.payload.accessToken) {
			localStorage.setItem('accessToken', action.payload.accessToken);
		}
	},
})
