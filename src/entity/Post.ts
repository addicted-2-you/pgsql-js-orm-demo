import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "./User";

@Entity({ name: "posts" })
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "user_id" })
  userId: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ name: "created_at" })
  createdAt: Date;

  @Column({ name: "updated_at" })
  updatedAt: Date;

  @Column({ name: "deleted_at", nullable: true })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: User;
}
