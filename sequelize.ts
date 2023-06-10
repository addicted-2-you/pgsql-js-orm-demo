import { Sequelize } from "sequelize-typescript";

import Comment from "./models/comment";
import PostReaction from "./models/post-reaction";
import Post from "./models/post";
import UserAvatar from "./models/user-avatar";
import User from "./models/user";

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: "localhost",
  dialect: "postgres",
  models: [Comment, PostReaction, Post, UserAvatar, User],
});

export default sequelize;
