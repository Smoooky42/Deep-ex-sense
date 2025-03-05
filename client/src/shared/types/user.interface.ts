export interface IUser {
	id: string
	createdAt: string
	updatedAt: string

	name: string
	email: string
	password: string
	picture: string
}

export interface IAddRole {
	value: string
	userId: string
}
