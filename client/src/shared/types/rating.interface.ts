
export interface IRating {
    id: string,
    createdAt: string,
    updatedAt: string,

    rating: number,

    userId: string,
    productId: string
}