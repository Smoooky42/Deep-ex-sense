import Image from 'next/image'
import Link from 'next/link'

import { PUBLIC_URL } from '@/config/url.config'

import styles from './productCard.module.scss'
import { IProduct } from '@/shared/types/product.interface'
import { formatPrice } from '@/lib/string/format-price'

interface ProductCardProps {
	product: IProduct
}

export function ProductCard({ product }: ProductCardProps) {
	return (
		<div className={styles.card}>
			<Link href={PUBLIC_URL.product(product.id)}>
				<Image
					src={product.images[0]}
					alt={product.name}
					width={220}
					height={220}
					priority
				/>
			</Link>

			<h3 className={styles.title}>{product.name}</h3>
			{/* <Link
				href={PUBLIC_URL.category(product.category.id)}
				className={styles.category}
			>
				{product.category.title}
			</Link> */}
			<p className={styles.price}>{formatPrice(product.price)}</p>
		</div>
	)
}
