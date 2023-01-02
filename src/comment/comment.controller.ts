import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { CommentService } from './comment.service';

import { CommentCreateDto } from './dto/comment-create.dto';
import { CommentDeleteDto } from './dto/comment-delete.dto';
import { CommentGetAllQuery } from './query/comment-getAll.query';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('create')
  create(@Body() createCommentDto: CommentCreateDto) {
    return this.commentService.create(createCommentDto);
  }

  @Get()
  getAll(@Query() query: CommentGetAllQuery) {
    return this.commentService.getAll(query);
  }

  @Delete('/:uuid')
  delete(@Param() query: CommentDeleteDto) {
    this.commentService.delete(query.uuid);
  }
}
