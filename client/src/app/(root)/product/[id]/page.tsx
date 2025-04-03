import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { IProduct } from '@/shared/types/product.interface'
import { Product } from './Product'
import { API_URL, SERVER_URL } from '@/config/api.config'
import { APP_URL } from '@/config/url.config'

export const revalidate = 60

export async function generateStaticParams() {
	const response = await fetch(SERVER_URL + API_URL.products(""), {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		// Следующее нужно для выполнения запроса на серверной стороне:
		// cache: "no-store", // Отключение кэширования для получения свежих данных
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

async function getProductById(id: string) {
	try {
		const response = await fetch(SERVER_URL + API_URL.products(`/${id}`), {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			// Следующее нужно для выполнения запроса на серверной стороне:
			// cache: "no-store", // Отключение кэширования для получения свежих данных
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

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
	const { id } = await params
	const product = await getProductById(id)

	return {
		title: product.name,
		description: product.description,
		openGraph: {
			images: [
				{
					url: `${new URL(product.images[0], APP_URL).toString()}`,
					width: 1000,
					height: 1000,
					alt: product.name,
				},
			],
		},
		metadataBase: new URL(APP_URL!), // Указываем базовый URL
	};

}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params
	const product = await getProductById(id)

	return (
		<Product
			initialProduct={product}
			id={id}
		/>
	)
}
