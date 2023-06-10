import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
} from "sequelize-typescript";

import User from "./user";
import Post from "./post";

@Table({
  tableName: "reactions_to_posts",
  timestamps: true,
  paranoid: true,
  underscored: true,
})
class PostReaction extends Model<PostReaction> {
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

  @ForeignKey(() => Post)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  postId: string;

  @Column({
    allowNull: false,
    type: DataType.STRING(50),
  })
  reactionType: string;

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

export default PostReaction;
