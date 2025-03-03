// import { createAsyncThunk } from "@reduxjs/toolkit"
// import { AppDispatch } from "@/store/store"
//
// export const fetchUsers = () => async (dispatch: AppDispatch) => {
// 	try {
// 		dispatch(userSlice.actions.usersFetching())
// 		const response = await axios.get<IUser>('https://')
// 		dispatch(userSlice.actions.usersFetchingSuccess(response.data))
// 	} catch(e) {
// 		dispatch(userSlice.actions.usersFetchingError(e.message))
// 	}
//
// }

// export const fetchUsers = createAsyncThunk(
// 	'user/fetchUsers',
// 	async (_, thunkAPI) => {
// 		try {
// 			const response = await axios.get<IUser>('https://')
// 			return response.data
// 		} catch (e) {
// 			return thunkAPI.rejectWithValue(e.message)
// 		}
// 	}
// )