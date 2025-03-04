import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param, Patch,
  Post,
  Query,
  UsePipes, ValidationPipe
} from '@nestjs/common'
import { ApiCreatedResponse, ApiProperty } from '@nestjs/swagger'

import { TrackService } from './track.service';
import { Auth } from '../auth/decorators/auth.decorator'
import { CreateTrackDto } from './dto/create-track.dto'
import { UpdateTrackDto } from './dto/update-track.dto'
import { Track } from '@prisma/client'

class TrackResponse implements Track {
  @ApiProperty()
  name: string;
  @ApiProperty()
  id: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  artist: string;
  @ApiProperty()
  text: string;
  @ApiProperty()
  listens: number;
  @ApiProperty()
  picture: string;
  @ApiProperty()
  audio: string;
  @ApiProperty()
  albumId: string;
}

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @ApiCreatedResponse({type: TrackResponse, description: 'Создание трека'})
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Auth()
  @Post()
  async create(@Body() dto: CreateTrackDto): Promise<Track> {
    return await this.trackService.create(dto);
  }

  @ApiCreatedResponse({type: [TrackResponse], description: 'Получение всех треков'})
  @HttpCode(200)
  @Get()
  async findAll(@Query('count') count: number,
          @Query('offset') offset: number) {
    return await this.trackService.getAll(count, offset)
  }

  @ApiCreatedResponse({type: TrackResponse, description: 'Получение трека по Id'})
  @HttpCode(200)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.trackService.getOne(id);
  }

  @ApiCreatedResponse({type: [TrackResponse], description: 'Получение трекав по поиску'})
  @HttpCode(200)
  @Get('/search')
  async search(@Query('query') query: string) {
    return await this.trackService.search(query)
  }

  @ApiCreatedResponse({type: Boolean, description: 'Удаление трека по Id'})
  @HttpCode(200)
  @Auth()
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.trackService.delete(id);
  }

  @ApiCreatedResponse({type: Boolean, description: 'Увеличение кол-ва прослушиваний'})
  @HttpCode(200)
  @Get('/listen/:id')
  async listen(@Param('id') id: string) {
    return await this.trackService.listen(id);
  }

  @ApiCreatedResponse({type: TrackResponse, description: 'Обновление трека'})
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Auth()
  @Patch(':id')
  async update(@Body() dto: UpdateTrackDto,
         @Param('id') id: string,
  ): Promise<Track> {
    return await this.trackService.update(id, dto);
  }
}
