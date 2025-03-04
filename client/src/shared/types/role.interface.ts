
export interface IRole {
    id: string,
    createdAt: string,
    updatedAt: string

    value: string,
    description: string
}

export interface IRoleInput extends Pick<IRole, 'value' | 'description'> {}