import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({ tableName: 'trackTable', createdAt: false, updatedAt: false })
export class Track extends Model {
  @Column({ type: DataType.STRING, primaryKey: true, unique: true })
  uuid: string;

  @Column({ type: DataType.STRING })
  name: string;
}
