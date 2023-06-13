import "reflect-metadata";
import { DataSource } from "typeorm";

import { User } from "./entity/User";
import { UserAvatar } from "./entity/UserAvatar";
import { Post } from "./entity/Post";
import { CreateUserRolesTable1686611838942 } from "./migrations/1686611838942-create-user-roles-table";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "blog",
  synchronize: false,
  logging: false,
  entities: [Post, User, UserAvatar],
  migrations: [CreateUserRolesTable1686611838942],
  subscribers: [],
});
