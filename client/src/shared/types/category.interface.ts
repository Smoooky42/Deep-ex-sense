
export interface ICategory {
    id: string,
    createdAt: string,
    updatedAt: string,

    name: string,
}

export interface ICategoryInput extends Pick<ICategory, 'name'> {}