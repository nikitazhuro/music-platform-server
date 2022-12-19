import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Track } from 'src/schemas/track.schema';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track)
    private trackModel: typeof Track,
  ) {}
  async create() {

  }

  async getTrack() {

  }

  async getAllTracks() {
    const track = await this.trackModel.create({
      uuid: '222',
      name: '123'
    });

    console.log(track);
    

    return track;
  }

  async deleteTrack() {

  }
}