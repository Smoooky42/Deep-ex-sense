'use client'

import { IProduct } from '@/shared/types/product.interface'

import styles from './product.module.scss'
import { ProductGallery } from './product-gallery/ProductGallery'
import { ProductInfo } from './product-info/ProductInfo'
import { useLazyFindOneQuery } from '@/services/productService'
import { useEffect } from 'react'

interface ProductProps {
	initialProduct: IProduct
	id?: string
}

export function Product({initialProduct, id}: ProductProps) {

	const [trigger, { data: product, isSuccess, isError }] = useLazyFindOneQuery();

	useEffect(() => {
		// Проверяем, есть ли id, и только тогда вызываем запрос
		if (id) {
		  trigger(id); // Запуск запроса с параметром id
		}
	  }, [id, trigger]); // Зависимость на id (и trigger для стабильности функции)
	
	
	// const { data: product } = useQuery({		// Пример с React Query
	// 	queryKey: ['product', initialProduct.id],
	// 	queryFn: () => productService.getById(id),
	// 	initialData: initialProduct,
	// 	enabled: !!id
	// })

	return (
		<div className={styles.product_page}>
			<div className={styles.content}>
				<div className={styles.blocks}>
					<ProductGallery product={isSuccess ? product : initialProduct} />
					<ProductInfo product={isSuccess ? product : initialProduct} />
				</div>
			</div>
		</div>
	)
}
