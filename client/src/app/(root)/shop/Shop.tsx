'use client'

import { useSearchParams } from 'next/navigation'
import { IProduct } from '@/shared/types/product.interface'
import { Catalog } from '@/components/shop/Catalog'
import { useSearchQuery } from '@/services/productService'

interface ShopProps {
	products: IProduct[]
}

export function Shop({ products }: ShopProps) {
	const searchParams = useSearchParams()
	const searchTerm = searchParams.get('searchTerm')

	const {data, isLoading, isError, isSuccess} = useSearchQuery(searchTerm)

    if (isError) return <div>An error has occurred!</div>

	return (
		<div className='my-6'>
			<Catalog
				title={
					searchTerm
						? `Поиск по запросу "${searchTerm}"`
						: 'Каталог товаров'
				}
				products={isSuccess ? data : products}
			/>
		</div>
	)
}