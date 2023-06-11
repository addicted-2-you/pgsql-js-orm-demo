import dotenv from "dotenv";

// services
import { getComments } from "./services/comment-services";
import { getPostsReactions } from "./services/post-reaction-services";
import { getPosts } from "./services/post-services";
import { getUsers } from "./services/user-services";
import { getUserAvatars } from "./services/user-avatar-services";

dotenv.config();

(async () => {
  const comments = await getComments();
  const reactions = await getPostsReactions();
  const posts = await getPosts();
  const userAvatars = await getUserAvatars();
  const users = await getUsers();

  console.log(comments);
  console.log(reactions);
  console.log(posts);
  console.log(userAvatars);
  console.log(users);
})();
