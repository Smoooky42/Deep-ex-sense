export interface ITrack {
	id: string
	createdAt: string
	updatedAt: string

	name: string
	artist: string
	text: string
	listens: number
	picture: string
	audio: string

	albumId: string
}

export interface ITrackInput
	extends Omit<ITrack, "id" | "createdAt" | "updatedAt"> {}
