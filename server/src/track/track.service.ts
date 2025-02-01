import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { CreateTrackDto } from './dto/create-track.dto'
import { FileService } from '../file/file.service'
import { FileResponse } from '../file/file.service'
import {Track} from '@prisma/client'

@Injectable()
export class TrackService {

	constructor(private readonly prisma: PrismaService,
				private readonly fileService: FileService) {}

	async create (dto: CreateTrackDto,
				 picture: Express.Multer.File[],
				 audio: Express.Multer.File[],
				 folder: string): Promise<Track> {
		const audioPath: FileResponse[] = await this.fileService.saveFiles(audio, folder = 'track/audio')
		const picturePath: FileResponse[] = await this.fileService.saveFiles(picture, folder = 'track/picture')
		const track: Track = await this.prisma.track.create({
			data: {
				name: dto.name,
				artist: dto.artist,
				text: dto.text,	//можно было просто dto
				listens: 0,
				picture: picturePath[0].url,
				audio: audioPath[0].url,
			}
		})
		return track
	}

	async getOne(id: string): Promise<Track> {
		const track: Track = await this.prisma.track.findUnique({
			where: {
				id
			}
		})
		if (!track) throw new NotFoundException('Трек не найден')

		return track
	}

	async getAll(count: number = 10, offset: number = 0): Promise<Track[]> {
		const tracks: Track[] = await this.prisma.track.findMany({
			orderBy: {
				createdAt: 'desc'
			},
			skip: offset,
			take: count
		})

		return tracks
	}

	async delete(id: string): Promise<string> {
		const track: Track = await this.prisma.track.delete({
			where: {
				id
			}
		})
		return track.id
	}

	async listen(id: string): Promise<boolean> {
		let { listens }: {listens: number} = await this.prisma.track.findUnique({
			where: {
				id: id
			},
			select: {
				listens: true
			}
		})

		const track: Track = await this.prisma.track.update({
			where: {
				id
			},
			data: {
				listens: listens + 1
			}
		})
		return true
	}

	async search(query: string): Promise<Track[]> {
		const tracks: Track[] = await this.prisma.track.findMany({
			where: {
				name: {
					contains: query,	//содержит query
					mode: 'insensitive'	//без учета регистра
				}
			}
		})
		return tracks;
	}

	async update(id: string,
				 dto: CreateTrackDto,
				 picture: Express.Multer.File[],
				 audio: Express.Multer.File[],
				 folder: string): Promise<Track> {
		const track: Track = await this.prisma.track.findUnique({
			where: {
				id,
			}
		})
		 const oldPicture = track.picture
		const oldAudio = track.audio

		await this.fileService.deleteFiles(oldPicture)
		await this.fileService.deleteFiles(oldAudio)

		const audioPath: FileResponse[] = await this.fileService.saveFiles(audio, folder = 'track/audio')
		const picturePath: FileResponse[] = await this.fileService.saveFiles(picture, folder = 'track/picture')

		const Newtrack: Track = await this.prisma.track.update({
			where: {
				id
			},
			data: {
				...dto,
				picture: picturePath[0].url,
				audio: audioPath[0].url,
			}
		})
		return Newtrack
	}
}
