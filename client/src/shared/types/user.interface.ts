export interface IUser {
	id: string

	name: string
	email: string
	password: string
	picture: string
}

export interface IAddRole {
	value: string
	userId: string
}
