import { Sequelize } from "sequelize-typescript";

import Comment from "./models/comment";
import PostReaction from "./models/post-reaction";
import Post from "./models/post";
import UserAvatar from "./models/user-avatar";
import UserRole from "./models/user-role";
import User from "./models/user";
import M2MUserRole from "./models/m2m-user-role";

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: "localhost",
  dialect: "postgres",
  models: [
    Comment,
    M2MUserRole,
    PostReaction,
    Post,
    UserAvatar,
    UserRole,
    User,
  ],
});

export default sequelize;
