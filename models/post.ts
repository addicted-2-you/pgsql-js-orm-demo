import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
} from "sequelize-typescript";

import User from "./user";

@Table({
  tableName: "posts",
  timestamps: true,
  paranoid: true,
  underscored: true,
})
class Post extends Model<Post> {
  @Column({
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    type: DataType.UUID,
  })
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @Column({
    allowNull: false,
    type: DataType.STRING(255),
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  content: string;

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

export default Post;
