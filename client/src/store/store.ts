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

// listenerMiddleware.startListening({	// Middleware для обработки ошибок 401 и обновления токена
// 	predicate: (action: any) => 
// 	  action.type.endsWith('/rejected') &&
// 	  action.error?.status === 401 && 
// 	  !action.meta.isRetry, // Проверяем, вызывался ли middleware
// 	effect: async (action: any, listenerApi) => {
// 	  try {
// 		// Запрос обновления токена через refresh endpoint
// 		const refreshResult: any = await listenerApi.dispatch(authApi.endpoints.refresh.initiate());
  
// 		if ('data' in refreshResult) {
// 		  // Сохраняем новый токен в localStorage
// 		  localStorage.setItem('accessToken', refreshResult.data.token);
  
// 		  // Отмечаем, что запрос повторяется
// 		  const originalAction = {
// 			...action.meta.arg,
// 			meta: {
// 			  ...action.meta.arg.meta,
// 			  isRetry: true,
// 			},
// 		  };
  
// 		  // Повторяем оригинальный запрос
// 		  const retryResult = await listenerApi.dispatch(originalAction);
  
// 		  if ('error' in retryResult) {
// 			console.error('Ошибка при повторном запросе:', retryResult.error);
// 		  }
// 		} else {
// 		  console.error('Ошибка обновления токена:', refreshResult.error);
// 		}
// 	  } catch (error) {
// 		console.error('Ошибка при обработке middleware:', error);
// 	  }
// 	},
//   });
  
