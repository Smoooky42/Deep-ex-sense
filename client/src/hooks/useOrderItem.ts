import { useAppSelector } from "./redux"

export const useOrderItem = () => {
	const items = useAppSelector(state => state.orderItem.items)

	const total = items.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	)

	return { items, total }
}
