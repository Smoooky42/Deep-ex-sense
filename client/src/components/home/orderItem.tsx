import Image from 'next/image'
import Link from 'next/link'

import { PUBLIC_URL } from '@/config/url.config'


import styles from './header.module.scss'

import { OrderActions } from './orderActions'
import { IOrderItem } from '@/shared/types/orderItem.interface'
import { formatPrice } from '@/lib/string/format-price'

interface OrderItemProps {
	item: IOrderItem
}

export function OrderItem({ item }: OrderItemProps) {
	return (
		<div className={styles.item}>
			<Link
				href={PUBLIC_URL.product(item.product.id)}
				className={styles.image}
			>
				<Image
					src={item.product.images[0]}
					alt={item.product.name}
					fill
				/>
			</Link>
			<div className={styles.right}>
				<h2>{item.product.name}</h2>
				<p>{formatPrice(item.product.price)}</p>
				<OrderActions item={item} />
			</div>
		</div>
	)
}
