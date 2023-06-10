import {
  Model,
  Table,
  Column,
  DataType,
  BelongsToMany,
} from "sequelize-typescript";

import User from "./user";
import M2MUserRole from "./m2m-user-role";

@Table({
  tableName: "user_roles",
  timestamps: true,
  paranoid: true,
  underscored: true,
})
class UserRole extends Model<UserRole> {
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
  name: string;

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

  @BelongsToMany(() => User, () => M2MUserRole)
  users: User[];
}

export default UserRole;
