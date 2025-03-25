import { Minus, Plus } from 'lucide-react'
import styles from './orderItem.module.scss'
import { Button } from '../ui/button'
import { IOrderItem } from '@/shared/types/orderItem.interface'
import { useAppDispatch } from '@/hooks/redux'
import { changeQuantity } from '@/store/reducers/orderItemSlice'

interface OrderItemProps {
	item: IOrderItem
}

export function OrderActions({ item }: OrderItemProps) {
	const dispatch = useAppDispatch()

	return (
		<div className={styles.actions}>
			<Button
				onClick={() => dispatch(changeQuantity({ id: item.id, type: 'minus' }))}
				variant='ghost'
				size='icon'
				disabled={item.quantity === 1}
			>
				<Minus />
			</Button>

			<input disabled readOnly value={item.quantity} />

			<Button
				onClick={() => dispatch(changeQuantity({ id: item.id, type: 'plus' }))}
				variant='ghost'
				size='icon'
			>
				<Plus />
			</Button>
		</div>
	)
}
