import { Controller, Get, Post } from "@nestjs/common";
import { TrackService } from "./track.service";

@Controller('/tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService){}

  @Post()
  create() {

  }

  @Get('track')
  getTrack() {
    const track = this.trackService.getAllTracks();
  }

  @Get()
  getAllTracks() {

  }

  @Post()
  deleteTrack() {

  }
}
