import { Controller, HttpCode, Post, Query, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { FileService } from './file.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { Auth } from '../auth/decorators/auth.decorator'

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}


  @HttpCode(200)
  @UseInterceptors(FilesInterceptor('files'))
  @Auth()
  @Post()
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>,
             @Query('folder') folder?: string) {
    return this.fileService.saveFiles(files, folder)
  }
}
