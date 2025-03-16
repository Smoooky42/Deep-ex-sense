'use client'

import { IProduct } from '@/shared/types/product.interface'

import styles from './product.module.scss'
import { ProductGallery } from './product-gallery/ProductGallery'
import { ProductInfo } from './product-info/ProductInfo'

interface ProductProps {
	initialProduct: IProduct
	id?: string
}

export function Product({initialProduct, id = ''}: ProductProps) {	// TODO: заменить на редакс
	// const { data: product } = useQuery({
	// 	queryKey: ['product', initialProduct.id],
	// 	queryFn: () => productService.getById(id),
	// 	initialData: initialProduct,
	// 	enabled: !!id
	// })
	const product = initialProduct	// TODO: удалить строку

	return (
		<div className={styles.product_page}>
			<div className={styles.content}>
				<div className={styles.blocks}>
					<ProductGallery product={product} />
					<ProductInfo product={product} />
				</div>
			</div>
		</div>
	)
}
