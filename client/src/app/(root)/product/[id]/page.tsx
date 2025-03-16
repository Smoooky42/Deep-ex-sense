import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { IProduct } from '@/shared/types/product.interface'
import { Product } from './Product'

export const revalidate = 60

// export async function generateStaticParams() {	// TODO: заменить на редакс
// 	const products = await productService.getAll()

// 	const paths = products.map(product => {
// 		return {
// 			params: { id: product.id }
// 		}
// 	})

// 	return paths
// }

// async function getProducts(params: { id: string }) {		// TODO: заменить на редакс
// 	try {
// 		const product = await productService.getById(params.id)

// 		const similarProducts = await productService.getSimilar(params.id)

// 		return { product, similarProducts }
// 	} catch {
// 		return notFound()
// 	}
// }

// export async function generateMetadata({params}: {params: { id: string }}): Promise<Metadata> {
// 	const { product } = await getProducts(params)	// TODO: заменить на редакс

// 	return {
// 		title: product.title,
// 		description: product.description,
// 		openGraph: {
// 			images: [
// 				{
// 					url: product.images[0],
// 					width: 1000,
// 					height: 1000,
// 					alt: product.title
// 				}
// 			]
// 		}
// 	}
// }

export default async function ProductPage({params}: {params: { id: string }}) {
	// const { product, similarProducts } = await getProducts(params)	
	
	const product: IProduct = {
			id: '1',
			name: 'тест',
			description: 'тест',
			price: 200,
			images: ['/images/auth.jpg'],
			categoryId: '1'
		}

	return (
		<Product
			initialProduct={product}
			id={params.id}
		/>
	)
}
