import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { Track } from './track.schema';

@Table({ tableName: 'commentTable' })
export class Comment extends Model {
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
