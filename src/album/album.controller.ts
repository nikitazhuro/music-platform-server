import { Controller, Post } from '@nestjs/common';

import { AlbumService } from './album.service';

@Controller('albums')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post('create')
  create() {
    const album = this.albumService.create();
    return album;
  }
}
