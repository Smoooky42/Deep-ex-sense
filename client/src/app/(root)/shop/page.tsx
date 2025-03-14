import type { Metadata } from 'next'
import { Shop } from './Shop'
import { IProduct } from '@/shared/types/product.interface'


export const metadata: Metadata = {
    title: 'Каталог товаров'
}

export const revalidate = 60    // Документация Next Route Segment Config

// async function getProducts() {   // Заменить на получение продуктов из базы данных
// 	const data = await productService.getAll()

// 	return data
// }

export default async function ShopPage() {
    //const data = await getProducts()
    const data: IProduct[] = [{
        id: '1',
        name: 'тест',
        description: 'тест',
        price: 200,
        images: ['/images/auth.jpg'],
        categoryId: '1'
    },
    {
        id: '2',
        name: 'тест2',
        description: 'тест2',
        price: 200,
        images: ['/images/auth.jpg'],
        categoryId: '2'
    },
    ]

    return <Shop products={data} />
}