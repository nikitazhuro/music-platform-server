import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { Track } from './track.schema';

export interface ICommentRepository {
  uuid: string;
  track_uuid: string;
  username: string;
  text: string;
  track?: Track;
}

@Table({ tableName: 'commentTable' })
export class Comment extends Model<Comment, ICommentRepository> {
  @Column({ type: DataType.STRING, primaryKey: true, unique: true })
  uuid: string;

  @ForeignKey(() => Track)
  @Column({ type: DataType.STRING })
  track_uuid: string;

  @Column({ type: DataType.STRING })
  username: string;

  @Column({ type: DataType.STRING })
  text: string;

  @BelongsTo(() => Track)
  track: Track;
}
