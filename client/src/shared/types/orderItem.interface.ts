import { IProduct } from "./product.interface"

export interface IOrderItem {
	id: number

	quantity: number
	price: number

	product: IProduct
}
