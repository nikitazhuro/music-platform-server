import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Album } from 'src/schemas/album.schema';
import { AlbumsTracks } from 'src/schemas/albums-tracks.schema';

import { Track } from 'src/schemas/track.schema';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  imports: [SequelizeModule.forFeature([Track, Album, AlbumsTracks])],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [],
})
export class TrackModule {}
