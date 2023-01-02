import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as UUID from 'uuid';

import { Comment, ICommentRepository } from 'src/schemas/comment.schema';
import { CommentCreateDto } from './dto/comment-create.dto';
import { TrackService } from 'src/track/track.service';
import { CommentGetAllQuery } from './query/comment-getAll.query';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment) private commentRepository: typeof Comment,
    private readonly trackService: TrackService,
  ) {}

  async create(createCommentDto: CommentCreateDto): Promise<Comment> {
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

  async getAll(query: CommentGetAllQuery): Promise<Array<Comment>> {
    const { track_uuid, limit, offset } = query;

    return this.commentRepository.findAll({
      where: {
        track_uuid,
      },
      limit: Number(limit),
      offset: Number(offset),
    });
  }

  async delete(uuid: string) {
    await this.commentRepository.destroy({
      where: {
        uuid,
      },
    });
  }
}
