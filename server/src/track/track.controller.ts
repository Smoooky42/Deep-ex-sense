import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post, Put,
  Query,
  UploadedFiles,
  UseInterceptors, UsePipes, ValidationPipe
} from '@nestjs/common'
import { TrackService } from './track.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { Auth } from '../auth/decorators/auth.decorator'
import { CreateTrackDto } from './dto/create-track.dto'

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Auth()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'picture', maxCount: 1 },
    { name: 'audio', maxCount: 1 },
  ]))
  @Post()
  create(@Body() dto: CreateTrackDto,
         @UploadedFiles() files: any,
         @Query('folder') folder?: string
         ) {
    const {picture, audio}: {picture: Express.Multer.File[], audio: Express.Multer.File[]} = files
    return this.trackService.create(dto, picture, audio, folder);
  }

  @HttpCode(200)
  @Get('/search')
  search(@Query('query') query: string) {
    console.log(query)
    return this.trackService.search(query)
  }

  @HttpCode(200)
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.trackService.getOne(id);
  }

  @HttpCode(200)
  @Get()
  getAll(@Query('count') count: number,
         @Query('offset') offset: number) {
    return this.trackService.getAll(count, offset)
  }

  @HttpCode(200)
  @Auth()
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.trackService.delete(id);
  }

  @HttpCode(200)
  @Get('/listen/:id')
  listen(@Param('id') id: string) {
    return this.trackService.listen(id);
  }

  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Auth()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'picture', maxCount: 1 },
    { name: 'audio', maxCount: 1 },
  ]))

  @Put(':id')
  update(@Body() dto: CreateTrackDto,
         @Param('id') id: string,
         @UploadedFiles() files: any,
         @Query('folder') folder?: string
  ) {
    const {picture, audio}: {picture: Express.Multer.File[], audio: Express.Multer.File[]} = files
    return this.trackService.update(id, dto, picture, audio, folder);
  }
}
