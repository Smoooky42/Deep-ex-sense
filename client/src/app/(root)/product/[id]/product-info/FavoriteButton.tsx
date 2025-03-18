import { Button } from '@/components/ui/button'
import { IProduct } from '@/shared/types/product.interface'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

interface FavoriteButtonProps {
	product: IProduct
}

export function FavoriteButton({ product }: FavoriteButtonProps) {
	// const { user } = useProfile()	//получение user с полем favorites с сервера

	// const queryClient = useQueryClient()

	// const { mutate, isPending } = useMutation({
	// 	mutationKey: ['toggle favorite'],
	// 	mutationFn: () => userService.toggleFavorite(product.id),
	// 	onSuccess() {
	// 		queryClient.invalidateQueries({
	// 			queryKey: ['profile']
	// 		})
	// 	}
	// })

	// if (!user) return null

	// const isExists = user.favorites.some(favorite => favorite.id === product.id)
	const isExists = false	//TODO: удалить строку

	return (
		<Button
			variant='secondary'
			size='icon'
			// onClick={() => mutate()}
			// disabled={isPending}
		>
			{isExists ? (
				<AiFillHeart color='#F43F5E' className='size-5' />
			) : (
				<AiOutlineHeart className='size-5' />
			)}
		</Button>
	)
}
