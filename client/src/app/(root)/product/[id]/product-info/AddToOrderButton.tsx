import { Button } from "@/components/ui/button"
import { useAppDispatch } from "@/hooks/redux"
import { useOrderItems } from "@/hooks/useOrderItems"
import { IProduct } from "@/shared/types/product.interface"
import { addToOrder, removeFromOrder } from "@/store/reducers/orderItemSlice"


interface AddToOrderButtonProps {
	product: IProduct
}

export function AddToOrderButton({ product }: AddToOrderButtonProps) {
	const dispatch = useAppDispatch()
	const { items } = useOrderItems() // Получение заказов из редакс

	const currentElement = items.find(( orderItem) => orderItem.product.id === product.id)

	return (
		<Button
			size='lg'
			className='w-full'
			onClick={() => currentElement
					? dispatch(removeFromOrder({ id: currentElement.id }))
					: dispatch(addToOrder({
							product,
							quantity: 1,
							price: product.price
						}))
			}
		>
			{currentElement ? 'Удалить из корзины' : 'Добавить в корзину'}
		</Button>
	)
}
