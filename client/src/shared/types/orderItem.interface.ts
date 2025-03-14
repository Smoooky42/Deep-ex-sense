import { IProduct } from "./product.interface"

export interface IOrderItem {
	id: string

	quantity: number
	price: number

	product: IProduct
}
