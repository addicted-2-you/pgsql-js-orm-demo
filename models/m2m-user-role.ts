import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";

import User from "./user";
import UserRole from "./user-role";

@Table({
  tableName: "m2m_users_roles",
  timestamps: true,
  underscored: true,
})
class M2MUserRole extends Model<M2MUserRole> {
  @Column({
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    type: DataType.UUID,
  })
  id: string;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    type: DataType.UUID,
    field: "user_id",
  })
  userId: string;

  @ForeignKey(() => UserRole)
  @Column({
    allowNull: false,
    type: DataType.UUID,
  })
  roleId: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => UserRole)
  role: UserRole;
}

export default M2MUserRole;
