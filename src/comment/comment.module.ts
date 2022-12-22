import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Comment } from 'src/schemas/comment.schema';
import { Track } from 'src/schemas/track.schema';
import { TrackModule } from 'src/track/track.module';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [SequelizeModule.forFeature([Comment, Track]), TrackModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
