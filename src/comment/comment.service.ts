import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as UUID from 'uuid';

import { Comment, ICommentRepository } from 'src/schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Track } from 'src/schemas/track.schema';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment) private commentRepository: typeof Comment,
    @InjectModel(Track) private trackRepository: typeof Track,
    private readonly trackService: TrackService,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const { track_uuid } = createCommentDto;

    const track = await this.trackService.findATrack(track_uuid);

    const commentConfig: ICommentRepository = {
      uuid: UUID.v4(),
      ...createCommentDto,
    };

    const comment = await this.commentRepository.create(commentConfig);

    if (!track.comments?.length) {
      track.comments = [comment];
    } else {
      track.comments = [...track.comments, comment];
    }

    await track.save();

    return comment;
  }

  async getAll() {
    return this.commentRepository.findAll();
  }

  async delete(uuid: string) {
    return this.commentRepository.destroy({
      where: {
        uuid,
      },
    });
  }
}
