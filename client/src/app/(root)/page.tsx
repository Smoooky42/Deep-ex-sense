import { Metadata } from "next"

import { NO_INDEX_PAGE } from "@/shared/constants/seo.constants"

import { Home } from "./Home"
import { API_URL, SERVER_URL } from "@/config/api.config";
import { IProduct } from "@/shared/types/product.interface";

export const metadata: Metadata = {
	title: "Основная",
	...NO_INDEX_PAGE
}
export const revalidate = 60    // Документация Next Route Segment Config

async function getProducts() {  //Для предварительного получения данных и рендеринга на стороне сервера
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
	  
	  const products: IProduct[] = (await response.json()).slice(0, 6);
	
	return products
}

export default async function HomePage() {
	const products = await getProducts()

	return <Home products={products} />
}
