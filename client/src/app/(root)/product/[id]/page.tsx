import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { IProduct } from '@/shared/types/product.interface'
import { Product } from './Product'
import { API_URL, SERVER_URL } from '@/config/api.config'

export const revalidate = 60

export async function generateStaticParams() {
	const response = await fetch(SERVER_URL + API_URL.products(""), {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		// Следующее нужно для выполнения запроса на серверной стороне:
		cache: "no-store", // Отключение кэширования для получения свежих данных
	});

	// Обработка ответа
	if (!response.ok) {
		throw new Error("Не удалось загрузить данные");
	}
	const products: IProduct[] = await response.json();

	const paths = products.map(product => {
		return {
			params: { id: product.id }
		}
	})

	return paths
}

async function getProductById(params: { id: string }) {		// TODO: заменить на редакс
	try {
		const response = await fetch(SERVER_URL + API_URL.products(`/${params.id}`), {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			// Следующее нужно для выполнения запроса на серверной стороне:
			cache: "no-store", // Отключение кэширования для получения свежих данных
		});
		// Обработка ответа
		if (!response.ok) {
			throw new Error("Не удалось загрузить данные");
		}
		const product: IProduct = await response.json();

		return product
	} catch {
		return notFound()
	}
}

export async function generateMetadata({params}: {params: { id: string }}): Promise<Metadata> {
	const product = await getProductById(params)

	return {
		title: product.name,
		description: product.description,
		openGraph: {	//для превью в соцсетях
			images: [
				{
					url: product.images[0],
					width: 1000,
					height: 1000,
					alt: product.name
				}
			]
		}
	}
}

export default async function ProductPage({ params }: { params: { id: string } }) {
	const product = await getProductById(params)	

	return (
		<Product
			initialProduct={product}
			id={params.id}
		/>
	)
}
