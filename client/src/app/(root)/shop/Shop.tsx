'use client'

import { useSearchParams } from 'next/navigation'
import { IProduct } from '@/shared/types/product.interface'
import { Catalog } from '@/components/shop/Catalog'

interface ShopProps {
	products: IProduct[]
}

export function Shop({ products }: ShopProps) {
	const searchParams = useSearchParams()
	const searchTerm = searchParams.get('searchTerm')

	// const { data } = useQuery({  // TODO: Заменить на запрос к серверу
	// 	queryKey: ['product explorer', searchTerm],
	// 	queryFn: () => productService.getAll(searchTerm),
	// 	initialData: products
	// })

	return (
		<div className='my-6'>
			<Catalog
				title={
					searchTerm
						? `Поиск по запросу "${searchTerm}"`
						: 'Каталог товаров'
				}
				products={products} // TODO: заменить на data
			/>
		</div>
	)
}