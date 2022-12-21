import {
  Column,
  Model,
  Table,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';

import { AlbumsTracks } from './albums-tracks.schema';

import { Track } from './track.schema';

@Table({ tableName: 'albumTable' })
export class Album extends Model {
  @Column({ type: DataType.STRING, primaryKey: true, unique: true })
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
