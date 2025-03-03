import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IUser } from "@/models/IUser"

export interface UserState {
	value: number
}

const initialState: UserState = {
	value: 0
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		increment: (state) => {
			state.value += 1
		},
		incrementByAmount: (state, action: PayloadAction<number>) => {
			state.value += action.payload
		},
	},
	// extraReducers: {
	// 	// 	[fetchUsers.fulfilled.type]: (state, action: PayloadAction<number>) => {
	// 	// 		state.value = action.payload
	// 	// 		state.error = ''
	// 	// 		state.isLoading = false
	// 	// 	}
	// 	// }
})

// Action creators are generated for each case reducer function
export const { } = userSlice.actions

export default userSlice.reducer