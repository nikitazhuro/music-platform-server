import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Comment } from 'src/schemas/comment.schema';
import { Track } from 'src/schemas/track.schema';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [SequelizeModule.forFeature([Comment, Track])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
