import {
  Column,
  Model,
  Table,
  DataType,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';

import { Album } from './album.schema';
import { AlbumsTracks } from './albums-tracks.schema';
import { Comment } from './comment.schema';

export interface ITrackRepository {
  uuid: string;
  albums?: Array<Album>;
  name: string;
  artist: string;
  listens: number;
  image: string;
  audio: string;
  comments?: Array<Comment>;
}

@Table({ tableName: 'trackTable', createdAt: false, updatedAt: false })
export class Track extends Model<Track, ITrackRepository> {
  @Column({ type: DataType.STRING, primaryKey: true, unique: true })
  uuid: string;

  @BelongsToMany(() => Album, () => AlbumsTracks)
  albums: Array<Album>;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  artist: string;

  @Column({ type: DataType.INTEGER })
  listens: number;

  @Column({ type: DataType.STRING })
  image: string;

  @Column({ type: DataType.STRING })
  audio: string;

  @HasMany(() => Comment)
  comments: Array<Comment>;
}
