import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as UUID from 'uuid';

import { Track } from 'src/schemas/track.schema';
import { TrackDto } from './dto/track.dto';

interface ICreateTrack {
  uuid: string;
  name: string;
  artist: string;
  listens: string;
  picture: string;
  audio: string;
}

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track)
    private trackRepository: typeof Track,
  ) {}
  async create(trackDto: TrackDto) {
    const uuid = UUID.v4();

    const params: ICreateTrack = {
      uuid,
      ...trackDto,
    };

    const track = await this.trackRepository.create({
      ...params,
    });

    return track;
  }
}
