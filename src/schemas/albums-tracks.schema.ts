import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';

import { Album } from './album.schema';
import { Track } from './track.schema';

@Table({ tableName: 'albumsTracksTable' })
export class AlbumsTracks extends Model {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Album)
  @Column({ type: DataType.STRING })
  albumUUID: string;

  @ForeignKey(() => Track)
  @Column({ type: DataType.STRING })
  trackUUID: string;
}
