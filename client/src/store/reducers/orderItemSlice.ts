import { IOrderItem } from '@/shared/types/orderItem.interface'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface IOrderInitialState {
	items: IOrderItem[]
}

export interface IAddToOrderPayload extends Omit<IOrderItem, 'id'> {}

export interface IChangeQuantityPayload extends Pick<IOrderItem, 'id'> {
	type: 'minus' | 'plus'
}

const initialState: IOrderInitialState = {
	items: []
}

export const orderItemSlice = createSlice({
	name: 'orderItem',
	initialState,
	reducers: {
		addToOrder: (state, action: PayloadAction<IAddToOrderPayload>) => {
			const isExist = state.items.some(
				item => item.product.id === action.payload.product.id
			)

			if (!isExist)
				state.items.push({ ...action.payload, id: state.items.length })
		},
		removeFromOrder: (state, action: PayloadAction<{ id: number }>) => {
			state.items = state.items.filter(
				item => item.id !== action.payload.id
			)
		},
		changeQuantity: ( state, action: PayloadAction<IChangeQuantityPayload>) => {
			const { id, type } = action.payload
			const item = state.items.find(item => item.id === id)
			if (item) {type === 'plus' ? item.quantity++ : item.quantity--}
		},
		reset: state => {
			state.items = []
		}
	}
})

export const { addToOrder, changeQuantity, removeFromOrder, reset } = orderItemSlice.actions;
export default orderItemSlice.reducer;
