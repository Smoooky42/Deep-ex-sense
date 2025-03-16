export interface IRating {
	id: string

	value: number	// TODO:проверить, какое поле прилетает с сервера. Если не value, то заменить на сервере

	userId: string
	productId: string
}
