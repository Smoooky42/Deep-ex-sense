import { IProduct } from '@/shared/types/product.interface'
import { AddToOrderButton } from './AddToOrderButton'
import { FavoriteButton } from './FavoriteButton'
import styles from './productInfo.module.scss'
import { formatPrice } from '@/lib/string/format-price'
import { getReviewWordWithEnding } from '@/lib/string/get-review-word-with-ending'

interface ProductInfoProps {
	product: IProduct
}

export function ProductInfo({ product }: ProductInfoProps) {
	const rating =
		Math.round(
			product.rating.reduce((acc, rating) => acc + rating.value, 0) /
				product.rating.length
		) || 0

	return (
		<div className={styles.product_info}>
			<h1 className={styles.title}>{product.name}</h1>
			<div className={styles.price}>{formatPrice(product.price)}</div>
			<hr />
			<p className={styles.description}>{product.description}</p>
			<hr />
			<div className={styles.label}>
				<h3>Категория: </h3>
				{product.category.name}

			</div>
			<div className={styles.label}>
				<h3>Средний рейтинг: </h3>
				<div className='text-sm'>
					⭐ {rating.toFixed(1)} |{' '}
					{getReviewWordWithEnding(product.rating.length)}
				</div>
			</div>
			<hr />
			<div className={styles.actions}>
				<AddToOrderButton product={product} />
				<FavoriteButton product={product} />
			</div>
		</div>
	)
}
