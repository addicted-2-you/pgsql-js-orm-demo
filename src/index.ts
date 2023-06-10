import dotenv from "dotenv";

dotenv.config();

import sequelize from "../sequelize";

// services
import { getComments } from "./services/comment-services";
import { getPostReactions } from "./services/post-reaction-services";
import { getPosts } from "./services/post-services";
import { getUserAvatars } from "./services/user-avatar-services";
import { getUserByUsername, getUsers } from "./services/user-services";

sequelize.sync();

(async () => {
  // some basic selects
  const comments = await getComments();
  const postReactions = await getPostReactions();
  const posts = await getPosts();
  const userAvatars = await getUserAvatars();
  const users = await getUsers();

  console.log(comments);
  console.log(postReactions);
  console.log(posts);
  console.log(userAvatars);
  console.log(users);

  // selecting a user by username + join this user's posts and roles
  const user = await getUserByUsername("john_doe");
  console.log(user);
})();
