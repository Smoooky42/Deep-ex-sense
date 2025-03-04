import { Body, Controller, HttpCode, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { FileService } from './file.service'
import { FilesInterceptor } from '@nestjs/platform-express'
import { Auth } from '../auth/decorators/auth.decorator'
import { ApiBody, ApiConsumes, ApiCreatedResponse, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { FileUploadDto } from './dto/file-upload.dto'

@Controller('file')
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@ApiConsumes('multipart/form-data')
	@ApiBody({ description: 'Массив файлов', type: FileUploadDto })
	@ApiCreatedResponse({type: [String], description: 'Загрузка файлов'})
	@HttpCode(200)
	@UseInterceptors(FilesInterceptor('file'))
	@Auth()
	@Post()
	async saveFiles(
		@UploadedFiles() files: Express.Multer.File[],
		@Query('folder') folder?: string
	) {
		return await this.fileService.saveFiles(files, folder)
	}

	@ApiCreatedResponse({type: [String], description: 'Удаление файлов'})
	@ApiBody({ type: [String] })
	@HttpCode(200)
	@Auth()
	@Post()
	async deleteFiles(@Body() filePaths: string[]) {
		return await this.fileService.deleteFiles(filePaths)
	}
}