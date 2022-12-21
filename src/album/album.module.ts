import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

import { Album } from 'src/schemas/album.schema';
import { AlbumsTracks } from 'src/schemas/albums-tracks.schema';
import { Track } from 'src/schemas/track.schema';

@Module({
  imports: [SequelizeModule.forFeature([Album, Track, AlbumsTracks])],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
