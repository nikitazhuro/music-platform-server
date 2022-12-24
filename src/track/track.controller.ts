import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express/multer';
import { Express } from 'express';

import { TrackDto } from './dto/track.dto';
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
    @Body() trackDto: TrackDto,
    @UploadedFiles()
    files: { audio?: Express.Multer.File[]; image?: Express.Multer.File[] },
  ) {
    return this.trackService.create(trackDto, files.image[0], files.audio[0]);
  }

  @Get()
  getAll() {
    return this.trackService.getAll();
  }
}
