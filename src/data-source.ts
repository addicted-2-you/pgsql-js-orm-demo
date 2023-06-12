import "reflect-metadata";
import { DataSource } from "typeorm";

import { User } from "./entity/User";
import { UserAvatar } from "./entity/UserAvatar";
import { Post } from "./entity/Post";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [Post, User, UserAvatar],
  migrations: [],
  subscribers: [],
});
