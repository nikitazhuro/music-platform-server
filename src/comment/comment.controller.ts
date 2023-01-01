import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { DeleteCommentDto } from './dto/delete-comment.dto';

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

  @Delete('/:uuid')
  delete(@Param() query: DeleteCommentDto) {
    const comment = this.commentService.delete(query.uuid);

    return comment;
  }
}
