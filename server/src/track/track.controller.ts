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

import { TrackService } from './track.service';
import { Auth } from '../auth/decorators/auth.decorator'
import { CreateTrackDto } from './dto/create-track.dto'
import { UpdateTrackDto } from './dto/update-track.dto'
import { Track } from '@prisma/client'

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Auth()
  @Post()
  create(@Body() dto: CreateTrackDto): Promise<Track> {
    return this.trackService.create(dto);
  }

  @HttpCode(200)
  @Get()
  findAll(@Query('count') count: number,
          @Query('offset') offset: number) {
    return this.trackService.getAll(count, offset)
  }

  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trackService.getOne(id);
  }

  @HttpCode(200)
  @Get('/search')
  search(@Query('query') query: string) {
    return this.trackService.search(query)
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
  @Patch(':id')
  update(@Body() dto: UpdateTrackDto,
         @Param('id') id: string,
  ): Promise<Track> {
    return this.trackService.update(id, dto);
  }
}
