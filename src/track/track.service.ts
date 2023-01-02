import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as UUID from 'uuid';

import { ITrackRepository, Track } from 'src/schemas/track.schema';
import { TrackCreateDto } from './dto/track-create.dto';
import { Files, FileService } from 'src/files/file.service';
import { TrackDeleteDto } from './dto/track-delete.dto';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track)
    private trackRepository: typeof Track,
    private readonly fileService: FileService,
  ) {}

  async create(trackDto: TrackCreateDto, image, audio): Promise<Track> {
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

  async delete(trackDeleteDto: TrackDeleteDto) {
    const { trackUUID, audio, image } = trackDeleteDto;

    await this.trackRepository.destroy({
      where: {
        uuid: trackUUID,
      },
    });

    await this.fileService.delete(Files.IMAGE, image);
    await this.fileService.delete(Files.AUDIO, audio);

    return HttpStatus.ACCEPTED;
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
    return this.trackRepository.findAll();
  }
}
