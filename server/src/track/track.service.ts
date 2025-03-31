import { Injectable, NotFoundException } from '@nestjs/common'

import { PrismaService } from '../prisma.service'
import { CreateTrackDto } from './dto/create-track.dto'
import { Track } from '@prisma/client'
import { UpdateTrackDto } from './dto/update-track.dto'

@Injectable()
export class TrackService {
	constructor(private readonly prisma: PrismaService) {}

	async create(dto: CreateTrackDto): Promise<Track> {
		const track: Track = await this.prisma.track.create({
			data: {
				name: dto.name,
				artist: dto.artist,
				text: dto.text,
				picture: dto.picture,
				audio: dto.audio, //можно было просто ...dto
				listens: 0
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
		const { listens }: { listens: number } =
			await this.prisma.track.findUnique({
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
					contains: query, //содержит query
					mode: 'insensitive' //без учета регистра
				}
			}
		})
		return tracks
	}

	async update(id: string, dto: UpdateTrackDto): Promise<Track> {
		const track: Track = await this.prisma.track.update({
			where: {
				id
			},
			data: {
				...dto
			}
		})

		return track
	}
}
