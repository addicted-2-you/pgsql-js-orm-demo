import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
} from "sequelize-typescript";

import User from "./user";

@Table({
  tableName: "user_avatars",
  timestamps: true,
  paranoid: true,
  underscored: true,
})
class UserAvatar extends Model<UserAvatar> {
  @Column({
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    type: DataType.UUID,
  })
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    unique: true,
    allowNull: true,
  })
  userId: string;

  @Column({
    allowNull: false,
    type: DataType.STRING(255),
  })
  avatarUrl: string;

  @Column({
    field: "created_at",
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @Column({
    field: "updated_at",
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;

  @Column({
    field: "deleted_at",
    type: DataType.DATE,
    allowNull: true,
  })
  deletedAt: Date;
}

export default UserAvatar;
