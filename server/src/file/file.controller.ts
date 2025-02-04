import { Controller, HttpCode, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { FileService } from './file.service'
import { FilesInterceptor } from '@nestjs/platform-express'
import { Auth } from '../auth/decorators/auth.decorator'

@Controller('files')
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@HttpCode(200)
	@UseInterceptors(FilesInterceptor('files'))
	@Auth()
	@Post()
	saveFiles(
		@UploadedFiles() files: Express.Multer.File[],
		@Query('folder') folder?: string
	) {
		return this.fileService.saveFiles(files, folder)
	}

	@HttpCode(200)
	@Auth()
	@Post()
	deleteFiles(filePaths: string[]) {
		return this.fileService.deleteFiles(filePaths)
	}
}