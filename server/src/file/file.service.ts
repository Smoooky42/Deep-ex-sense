import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { path } from 'app-root-path'
import { ensureDir, writeFile, rm } from 'fs-extra'

enum FileType {
	AUDIO = 'audio',
	IMAGE = 'image'
}

@Injectable()
export class FileService {
	async saveFiles(files: Express.Multer.File[],
					// type: FileType,
					folder?: string ): Promise<string[]> {
		try {
			const uploadedFolder = `${path}/uploads${folder}`
			await ensureDir(uploadedFolder)

			const filePaths: string[] = await Promise.all(
				files.map(async file => {
					const originalName = `${Date.now()}-${file.originalname}`
					// const fileExtension = file.originalname.split('.').pop() //разрешение файла
					// const fileName = uuid.v4() + '.' + fileExtension

					await writeFile(`${uploadedFolder}/${originalName}`, file.buffer)
					return `/uploads${folder}/${originalName}`
				})
			)
			return filePaths
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async deleteFiles(filePaths: string[]): Promise<string[]>{
		try {
			filePaths.map(
				async(filePath: string)=> await rm(filePath))

			return filePaths
		} catch(e){
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}
}
