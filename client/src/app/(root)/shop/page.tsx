import type { Metadata } from 'next'
import { Shop } from './Shop'
import { API_URL, SERVER_URL } from '@/config/api.config';


export const metadata: Metadata = {
    title: 'Каталог товаров'
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
      
      const products = await response.json();

      console.log(products)
    

	return products
}

export default async function ShopPage() {
	const products = await getProducts()

	return <Shop products={products} />
}