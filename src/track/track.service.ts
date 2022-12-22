import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as UUID from 'uuid';

import { ITrackRepository, Track } from 'src/schemas/track.schema';
import { TrackDto } from './dto/track.dto';
import { FileService } from 'src/files/file.service';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track)
    private trackRepository: typeof Track,
    private readonly fileService: FileService,
  ) {}

  async create(trackDto: TrackDto, image): Promise<Track> {
    const filePath = await this.fileService.create(image);

    const params: ITrackRepository = {
      uuid: UUID.v4(),
      ...trackDto,
      picture: filePath,
      audio: '',
      listens: 0,
    };

    const track = await this.trackRepository.create({
      ...params,
    });

    return track;
  }

  async findATrack(uuid: string): Promise<Track> {
    const track = await this.trackRepository.findOne({
      where: {
        uuid,
      },
    });

    return track;
  }

  async getAll(): Promise<Array<Track>> {
    return this.trackRepository.findAll({
      include: {
        all: true,
      },
    });
  }
}
