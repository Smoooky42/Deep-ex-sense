import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { path } from 'app-root-path'
import { ensureDir, writeFile, rm } from 'fs-extra'

enum FileType {
	AUDIO = 'audio',
	IMAGE = 'image'
}
export interface FileResponse {
	url: string;
	name: string;
}

@Injectable()
export class FileService {
	async saveFiles(files: Express.Multer.File[],
					// type: FileType,
					folder: string ): Promise<FileResponse[]> {
		try {
			const uploadedFolder = `${path}/uploads/${folder}`
			await ensureDir(uploadedFolder)

			const response: FileResponse[] = await Promise.all(
				files.map(async file => {
					const originalName = `${Date.now()}-${file.originalname}`
					// const fileExtension = file.originalname.split('.').pop() //разрешение файла
					// const fileName = uuid.v4() + '.' + fileExtension

					await writeFile(`${uploadedFolder}/${originalName}`, file.buffer)

					return {
						url:	 `${uploadedFolder}/${originalName}`,
						name: originalName
					}
				})
			)

			return response
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async deleteFiles(filePath: string): Promise<boolean>{
		try {
			await rm(filePath)
			return true
		} catch(e){
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}
}
