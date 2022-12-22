import {
  Column,
  Model,
  Table,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';

import { AlbumsTracks } from './albums-tracks.schema';

import { Track } from './track.schema';

export interface IAlbumRepository {
  uuid: string;
  name: string;
  picture: string;
  text: string;
  tracks: Array<Track>;
}

@Table({ tableName: 'albumTable' })
export class Album extends Model<Album, IAlbumRepository> {
  @Column({ type: DataType.UUID, primaryKey: true, unique: true })
  uuid: string;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  picture: string;

  @Column({ type: DataType.STRING })
  text: string;

  @BelongsToMany(() => Track, () => AlbumsTracks)
  tracks: Array<Track>;
}
