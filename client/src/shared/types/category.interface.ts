export interface ICategory {
	id: string

	name: string
}

export interface ICategoryInput extends Pick<ICategory, "name"> {}
