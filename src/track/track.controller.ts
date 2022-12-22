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
      { name: 'picture', maxCount: 1 },
      { name: 'image', maxCount: 1 },
    ]),
  )
  create(
    @Body() trackDto: TrackDto,
    @UploadedFiles()
    files: { picture?: Express.Multer.File[]; image?: Express.Multer.File[] },
  ) {
    console.log(files);

    const track = this.trackService.create(trackDto, files.image[0]);
    return track;
  }

  @Get()
  getAll() {
    const tracks = this.trackService.getAll();

    return tracks;
  }
}
