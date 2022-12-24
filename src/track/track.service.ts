import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as UUID from 'uuid';

import { ITrackRepository, Track } from 'src/schemas/track.schema';
import { TrackDto } from './dto/track.dto';
import { Files, FileService } from 'src/files/file.service';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track)
    private trackRepository: typeof Track,
    private readonly fileService: FileService,
  ) {}

  async create(trackDto: TrackDto, image, audio): Promise<Track> {
    const imagePath = await this.fileService.create(Files.IMAGE, image);
    const audioPath = await this.fileService.create(Files.AUDIO, audio);

    const params: ITrackRepository = {
      uuid: UUID.v4(),
      ...trackDto,
      image: imagePath,
      audio: audioPath,
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
