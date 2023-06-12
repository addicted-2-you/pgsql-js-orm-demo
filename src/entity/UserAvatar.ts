import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "user_avatars" })
export class UserAvatar {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "user_id" })
  userId: string;

  @Column({ name: "avatar_url" })
  avatarUrl: string;

  @Column({ name: "created_at" })
  createdAt: Date;

  @Column({ name: "updated_at" })
  updatedAt: Date;

  @Column({ name: "deleted_at", nullable: true })
  deletedAt: Date;
}
