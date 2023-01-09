import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UploadedFile,
  UseInterceptors,
  Patch,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

import { AlbumCreateDto } from './dto/album-create.dto';
import { AlbumService } from './album.service';
import { AlbumUpdateTracksDto } from './dto/album-updateTracks.dto';

@Controller('albums')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() albumCreateDto: AlbumCreateDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.albumService.create(albumCreateDto, file);
  }

  @Patch(':uuid')
  updateTrackList(@Body() albumUpdateTracksDto: AlbumUpdateTracksDto) {
    return this.albumService.updateTrackList(albumUpdateTracksDto);
  }

  @Get()
  getAlbums() {
    return this.albumService.getAlbums();
  }

  @Get(':uuid')
  getAlbum(@Param('uuid') uuid: string) {
    return this.albumService.getAlbum(uuid);
  }
}
