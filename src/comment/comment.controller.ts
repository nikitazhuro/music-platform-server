import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('create')
  create(@Body() createCommentDto: CreateCommentDto) {
    const comment = this.commentService.create(createCommentDto);

    return comment;
  }

  @Get()
  getAll() {
    const allComments = this.commentService.getAll();

    return allComments;
  }

  @Get('delete')
  delete() {
    const comment = this.commentService.delete();

    return comment;
  }
}
