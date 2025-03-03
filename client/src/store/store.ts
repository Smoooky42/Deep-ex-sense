import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userReducer from './reducers/userSlice'
import { userApi } from "@/services/userService"

const rootReducer = combineReducers({
	userReducer
})

export const store = configureStore({
	reducer: {
		rootReducer,
		[userApi.reducerPath]: userApi.reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(userApi.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
