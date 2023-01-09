import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { v4 } from 'uuid';

import { Files, FileService } from 'src/files/file.service';

import { AlbumCreateDto } from './dto/album-create.dto';
import { Album, IAlbumRepository } from 'src/schemas/album.schema';
import { AlbumUpdateTracksDto } from './dto/album-updateTracks.dto';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album) private albumRepository: typeof Album,
    private readonly fileService: FileService,
  ) {}

  async create(albumCreateDto: AlbumCreateDto, file: any) {
    const fileName = await this.fileService.create(Files.IMAGE, file);

    const config: IAlbumRepository = {
      uuid: v4(),
      image: fileName,
      ...albumCreateDto,
    };

    return this.albumRepository.create(config);
  }

  async updateTrackList(albumUpdateTracksDto: AlbumUpdateTracksDto) {
    const { albumUUID, trackList } = albumUpdateTracksDto;

    const album = await this.albumRepository.findOne({
      where: {
        uuid: albumUUID,
      },
      include: {
        all: true,
      },
    });

    if (trackList?.length) {
      await album.$set('tracks', trackList as string[]);
    } else {
      await album.$set('tracks', []);
    }

    album.tracks = [];

    return album;
  }

  async getAlbums() {
    return this.albumRepository.findAll();
  }

  async getAlbum(uuid: string) {
    return this.albumRepository.findOne({
      where: {
        uuid,
      },
      include: {
        all: true,
      },
    });
  }
}
