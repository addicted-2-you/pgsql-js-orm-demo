import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: "users",
  timestamps: true,
  paranoid: true,
  underscored: true,
})
class User extends Model<User> {
  @Column({
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    type: DataType.UUID,
  })
  id: string;

  @Column({
    allowNull: false,
    type: DataType.STRING(255),
  })
  username: string;

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

export default User;
