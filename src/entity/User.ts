import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";

import { UserAvatar } from "./UserAvatar";
import { Post } from "./Post";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("identity")
  id: number;

  @Column()
  username: string;

  @Column({ name: "created_at" })
  createdAt: Date;

  @Column({ name: "updated_at" })
  updatedAt: Date;

  @Column({ name: "deleted_at", nullable: true })
  deletedAt: Date;

  @OneToOne(() => UserAvatar)
  @JoinColumn({ name: "id", referencedColumnName: "userId" })
  avatar: UserAvatar;

  @OneToMany(() => Post, (post) => post.user)
  @JoinColumn({ name: "id", referencedColumnName: "userId" })
  posts: Post[];
}
