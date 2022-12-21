import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Album } from 'src/schemas/album.schema';

@Injectable()
export class AlbumService {
  constructor(@InjectModel(Album) private albumRepository: Album) {}

  async create() {
  }
}
