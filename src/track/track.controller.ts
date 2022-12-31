import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  Delete,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express/multer';
import { Express } from 'express';

import { TrackCreateDto } from './dto/track-create.dto';
import { TrackDeleteDto } from './dto/track-delete.dto';
import { TrackService } from './track.service';

@Controller('/tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post('create')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'audio', maxCount: 1 },
      { name: 'image', maxCount: 1 },
    ]),
  )
  create(
    @Body() trackCreateDto: TrackCreateDto,
    @UploadedFiles()
    files: { audio?: Express.Multer.File[]; image?: Express.Multer.File[] },
  ) {
    return this.trackService.create(
      trackCreateDto,
      files.image[0],
      files.audio[0],
    );
  }

  @Delete('delete')
  delete(@Body() trackDeleteDto: TrackDeleteDto) {
    return this.trackService.delete(trackDeleteDto);
  }

  @Get()
  getAll() {
    return this.trackService.getAll();
  }
}
