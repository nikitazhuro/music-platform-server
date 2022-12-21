import { Controller, Get, Post, Body } from '@nestjs/common';

import { TrackDto } from './dto/track.dto';
import { TrackService } from './track.service';

@Controller('/tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post('track')
  create(@Body() trackDto: TrackDto) {
    const track = this.trackService.create(trackDto);
    return track;
  }
}
