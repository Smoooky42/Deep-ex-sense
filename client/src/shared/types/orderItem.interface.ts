import { IProduct } from './product.interface'

export interface IOrderItem {
    id: string,
    createdAt: string,
    updatedAt: string,

	quantity: number
	price: number

	product: IProduct
}
