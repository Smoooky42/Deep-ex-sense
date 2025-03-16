import { Button } from "@/components/ui/button"
import { IProduct } from "@/shared/types/product.interface"


interface AddToOrderButtonProps {
	product: IProduct
}

export function AddToOrderButton({ product }: AddToOrderButtonProps) {
	// const { addToCart, removeFromCart } = useActions()	//это диспатч
	// const { items } = useCart()	// Получение заказов из редакс

	// const currentElement = items.find(
	// 	cartItem => cartItem.product.id === product.id
	// )

	return (
		<Button
			size='lg'
			className='w-full'
			// onClick={() =>
			// 	currentElement
			// 		? removeFromCart({ id: currentElement.id })
			// 		: addToCart({
			// 				product,
			// 				quantity: 1,
			// 				price: product.price
			// 			})
			// }
		>
			{/* {currentElement ? 'Удалить из корзины' : 'Добавить в корзину'} */}
			Добавить в корзину
		</Button>
	)
}
