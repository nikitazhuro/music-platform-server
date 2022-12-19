import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Track } from 'src/schemas/track.schema';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  imports: [SequelizeModule.forFeature([Track])],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [],
})
export class TrackModule {}
