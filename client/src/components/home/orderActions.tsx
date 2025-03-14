import { Minus, Plus } from 'lucide-react'
import styles from './header.module.scss'
import { Button } from '../ui/button'
import { IOrderItem } from '@/shared/types/orderItem.interface'

interface OrderItemProps {
	item: IOrderItem
}

export function OrderActions({ item }: OrderItemProps) {
	// const { changeQuantity } = useActions()	// TODO: добавить метод в orderSlice

	return (
		<div className={styles.actions}>
			<Button
				// onClick={() => changeQuantity({ id: item.id, type: 'minus' })}
				variant='ghost'
				size='icon'
				disabled={item.quantity === 1}
			>
				<Minus />
			</Button>

			<input disabled readOnly value={item.quantity} />

			<Button
				// onClick={() => changeQuantity({ id: item.id, type: 'plus' })}
				variant='ghost'
				size='icon'
			>
				<Plus />
			</Button>
		</div>
	)
}
