const dotenv = require("dotenv");
const { Client } = require("pg");

const {
  createUsers,
  createPosts,
  createComments,
  createReactions,
  createUserAvatars,
  createReactionsToPosts,
  createUserPermissions,
  createPermissions,
  createRolePermissions,
  createUserRoles,
  createRoles,
} = require("./generate-data");

dotenv.config();

// Configure the PostgreSQL client
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const USERS_NUM = 10;
const POSTS_NUM = 20;
const COMMENTS_NUM = 30;
const REACTIONS_TO_POSTS_NUM = 10;

async function insertData() {
  await client.connect();

  const users = await createUsers(USERS_NUM);
  const avatars = await createUserAvatars(users);

  const permissions = await createPermissions();
  const roles = await createRoles();
  const rolePermissions = await createRolePermissions(roles, permissions);
  const userRoles = await createUserRoles(users, roles);
  const userPermissions = await createUserPermissions(users, roles);

  const posts = await createPosts(users, POSTS_NUM);
  const comments = await createComments(posts, users, COMMENTS_NUM);
  const reactions = await createReactions();
  const reactionsToPosts = await createReactionsToPosts(
    posts,
    users,
    reactions,
    REACTIONS_TO_POSTS_NUM
  );

  const userPromises = Promise.all(
    users.map((user) =>
      client.query(
        "INSERT INTO users (id, username, password) VALUES ($1, $2, $3)",
        [user.id, user.username, user.password]
      )
    )
  );

  const avatarPromises = Promise.all(
    avatars.map((avatar) =>
      client.query(
        "INSERT INTO user_avatars (id, user_id, avatar_url) VALUES ($1, $2, $3)",
        [avatar.id, avatar.user_id, avatar.avatar_url]
      )
    )
  );

  const permissionsPromises = Promise.all(
    permissions.map((permission) =>
      client.query("INSERT INTO permissions (id, title) VALUES ($1, $2)", [
        permission.id,
        permission.title,
      ])
    )
  );

  const rolesPromises = Promise.all(
    roles.map((role) =>
      client.query("INSERT INTO roles (id, title) VALUES ($1, $2)", [
        role.id,
        role.title,
      ])
    )
  );

  const rolePermissionsPromises = Promise.all(
    rolePermissions.map((rp) =>
      client.query(
        "INSERT INTO role_permissions (role_id, permission_id) VALUES ($1, $2)",
        [rp.role_id, rp.permission_id]
      )
    )
  );

  const userRolesPromises = Promise.all(
    userRoles.map((ur) =>
      client.query(
        "INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2)",
        [ur.user_id, ur.role_id]
      )
    )
  );

  const userPermissionsPromises = Promise.all(
    userPermissions.map((up) =>
      client.query(
        "INSERT INTO user_roles (user_id, permission_id) VALUES ($1, $2)",
        [up.user_id, up.permission_id]
      )
    )
  );

  const postPromises = Promise.all(
    posts.map((post) =>
      client.query(
        "INSERT INTO posts (id, user_id, title, content) VALUES ($1, $2, $3, $4)",
        [post.id, post.user_id, post.title, post.content]
      )
    )
  );

  const commentPromises = Promise.all(
    comments.map((comment) =>
      client.query(
        "INSERT INTO comments (id, post_id, user_id, content) VALUES ($1, $2, $3, $4)",
        [comment.id, comment.post_id, comment.user_id, comment.content]
      )
    )
  );

  const reactionPromises = Promise.all(
    reactions.map((reaction) =>
      client.query("INSERT INTO reactions (id, title) VALUES ($1, $2)", [
        reaction.id,
        reaction.title,
      ])
    )
  );

  const reactionToPostsPromises = Promise.all(
    reactionsToPosts.map((reactionToPost) =>
      client.query(
        "INSERT INTO reactions_to_posts (id, user_id, post_id, reaction_id) VALUES ($1, $2, $3, $4)",
        [
          reactionToPost.id,
          reactionToPost.user_id,
          reactionToPost.post_id,
          reactionToPost.reaction_id,
        ]
      )
    )
  );

  await Promise.all([
    userPromises.then(() => console.log("inserted users")),
    avatarPromises.then(() => console.log("inserted avatars")),
    permissionsPromises.then(() => console.log("inserted permissions")),
    rolesPromises.then(() => console.log("inserted roles")),
    rolePermissionsPromises.then(() =>
      console.log("inserted role permissions")
    ),
    userRolesPromises.then(() => console.log("inserted user roles")),
    userPermissionsPromises.then(() =>
      console.log("inserted user permissions")
    ),
    postPromises.then(() => console.log("inserted posts")),
    commentPromises.then(() => console.log("inserted comments")),
    reactionPromises.then(() => console.log("inserted reactions")),
    reactionToPostsPromises.then(() =>
      console.log("inserted reactionsToPosts")
    ),
  ]);

  await client.end();
}

insertData().catch((err) => console.error(err));
