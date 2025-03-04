import { ITrack } from "./track.interface";

export interface IAlbum {
    id: string,
    createdAt: string,
    updatedAt: string,

    name: string,
    artist: string,
    picture: string,

    tracks: ITrack
}

