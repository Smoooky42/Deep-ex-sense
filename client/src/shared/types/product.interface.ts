import { ICategory } from "./category.interface"
import { IRating } from "./rating.interface"

export interface IProduct {
	id: string

	name: string
	description: string
	price: number
	images: string[]

	Category: ICategory
	rating?: IRating[]
}

export interface IProductInput
	extends Omit<IProduct, "id" | "rating" | "category"> {
		categoryId: string
	}

export interface IProductInfo {
	id: string
	createdAt: string
	updatedAt: string

	title: string
	description: string

	productId: string
}

export interface IProductInfoInput
	extends Omit<IProductInfo, "id" | "createdAt" | "updatedAt"> {}
