
export interface IProduct {
    id: string,
    createdAt: string,
    updatedAt: string,

    name: string,
    description: string,
    price: number,
    images: string[],

    categoryId: string,
}

export interface IProductInput extends Omit<IProduct, 'id' | 'createdAt' | 'updatedAt'> {}

export interface IProductInfo {
    id: string,
    createdAt: string,
    updatedAt: string,

    title: string,
    description: string,

    productId: string
}

export interface IProductInfoInput extends Omit<IProductInfo, 'id' | 'createdAt' | 'updatedAt'> {}