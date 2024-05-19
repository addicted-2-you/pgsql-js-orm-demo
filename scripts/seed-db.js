const { client } = require("./client");
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
const {
  generateInsertUsersSQL,
  generateInsertUserAvatarsSQL,
  generateInsertPermissionsSQL,
  generateInsertRolesSQL,
  generateInsertRolePermissionsSQL,
  generateInsertUserRolesSQL,
  generateInsertUserPermissionsSQL,
  generateInsertPostsSQL,
  generateInsertPostCommentsSQL,
  generateInsertReactionsSQL,
  generateInsertReactionsToPosts,
} = require("./generate-sql");
const { selectRoles, selectPermissions } = require("./services");

const USERS_NUM = 1000;
const POSTS_NUM = 2000;
const COMMENTS_NUM = 3000;
const REACTIONS_TO_POSTS_NUM = 10000;

async function insertData() {
  await client.connect();

  const users = await createUsers(USERS_NUM);
  const avatars = await createUserAvatars(users);

  let permissions = [];
  let roles = [];
  let rolePermissions = [];
  let userRoles = [];
  let userPermissions = [];

  const existingRoles = await selectRoles();
  if (existingRoles.length) {
    const existingPermissions = await selectPermissions();

    userRoles = await createUserRoles(users, existingRoles);
    userPermissions = await createUserPermissions(users, existingPermissions);
  } else {
    permissions = await createPermissions();
    roles = await createRoles();
    rolePermissions = await createRolePermissions(roles, permissions);
    userRoles = await createUserRoles(users, roles);
    userPermissions = await createUserPermissions(users, permissions);
  }

  const posts = await createPosts(users, POSTS_NUM);
  const comments = await createComments(posts, users, COMMENTS_NUM);
  const reactions = await createReactions();
  const reactionsToPosts = await createReactionsToPosts(
    posts,
    users,
    reactions,
    REACTIONS_TO_POSTS_NUM
  );

  const usersPromise = client.query(generateInsertUsersSQL(users));
  const avatarsPromise = client.query(generateInsertUserAvatarsSQL(avatars));
  const permissionsPromise = client.query(
    generateInsertPermissionsSQL(permissions)
  );
  const rolesPromise = client.query(generateInsertRolesSQL(roles));
  const rolePermissionsPromise = client.query(
    generateInsertRolePermissionsSQL(rolePermissions)
  );
  const userRolesPromise = client.query(generateInsertUserRolesSQL(userRoles));
  const userPermissionsPromise = client.query(
    generateInsertUserPermissionsSQL(userPermissions)
  );
  const postPromise = client.query(generateInsertPostsSQL(posts));
  const commentPromise = client.query(generateInsertPostCommentsSQL(comments));
  const reactionPromise = client.query(generateInsertReactionsSQL(reactions));
  const reactionToPostsPromise = client.query(
    generateInsertReactionsToPosts(reactionsToPosts)
  );

  await Promise.all([
    usersPromise.then(() => console.log("inserted users")),
    avatarsPromise.then(() => console.log("inserted avatars")),
    permissionsPromise.then(() => console.log("inserted permissions")),
    rolesPromise.then(() => console.log("inserted roles")),
    rolePermissionsPromise.then(() => console.log("inserted role permissions")),
    userRolesPromise.then(() => console.log("inserted user roles")),
    userPermissionsPromise.then(() => console.log("inserted user permissions")),
    postPromise.then(() => console.log("inserted posts")),
    commentPromise.then(() => console.log("inserted comments")),
    reactionPromise.then(() => console.log("inserted reactions")),
    reactionToPostsPromise.then(() => console.log("inserted reactionsToPosts")),
  ]);

  await client.end();
}

insertData().catch((err) => console.error(err));
