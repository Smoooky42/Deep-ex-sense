export function formatPrice(price: number) {
	return price.toLocaleString("ru-RU", {	// Преобразовывает число в строку в русском формате с добавление знака валюты рублей
		style: "currency",
		currency: "RUB",
		minimumFractionDigits: 0
	})
}
