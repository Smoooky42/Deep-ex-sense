import Link from 'next/link'
import styles from './catalog.module.scss'
import { IProduct } from '@/shared/types/product.interface'
import { ProductCard } from './productCard/ProductCard'

export interface ICatalog {
	title: string
	description?: string
	products: IProduct[]
}
export function Catalog({title, description, products}: ICatalog) {
	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<h1>{title}</h1>
				{description && <p>{description}</p>}
			</div>

			<div className={styles.catalog}>
				<div className={styles.products}>
					{products.length ? (
						products.map(product => (
							<ProductCard key={product.id} product={product} />
						))
					) : (
						<div>Ничего не найдено</div>
					)}
				</div>
			</div>
		</div>
	)
}
