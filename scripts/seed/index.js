const fs = require("node:fs/promises");

const { client } = require("../client");
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
  createFriendRequests,
  createChatting,
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
  generateInsertReactionsToPostsSQL,
  generateFriendRequestsSQL,
  generateChatsSQL,
  generateMessagesSQL,
  generateChatMembersSQL,
} = require("./generate-sql");
const { selectRoles, selectPermissions } = require("./services");
const { millisecondsToSeconds } = require("./utils");

const USERS_NUM = 1000;
const POSTS_NUM = 2000;
const COMMENTS_NUM = 3000;
const REACTIONS_TO_POSTS_NUM = 10000;

async function insertData() {
  await client.connect();

  const startTs = performance.now();

  console.log(
    "start generating users...",
    millisecondsToSeconds(performance.now() - startTs)
  );

  const users = await createUsers(USERS_NUM);

  console.log(
    "users generated, start generating user avatars...",
    millisecondsToSeconds(performance.now() - startTs)
  );

  const avatars = await createUserAvatars(users);

  console.log(
    "user avatars generated, start generating roles and permissions...",
    millisecondsToSeconds(performance.now() - startTs)
  );

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

  console.log(
    "roles and permissions generated, start generating posts...",
    millisecondsToSeconds(performance.now() - startTs)
  );

  const posts = await createPosts(users, POSTS_NUM);

  console.log(
    "posts generated, start generating comments...",
    millisecondsToSeconds(performance.now() - startTs)
  );

  const comments = await createComments(posts, users, COMMENTS_NUM);

  console.log(
    "comments generated, start generating reactions...",
    millisecondsToSeconds(performance.now() - startTs)
  );

  const reactions = await createReactions();

  const reactionsToPosts = await createReactionsToPosts(
    posts,
    users,
    reactions,
    REACTIONS_TO_POSTS_NUM
  );

  console.log(
    "reactions generated, start generating friendRequests...",
    millisecondsToSeconds(performance.now() - startTs)
  );

  const friendRequests = await createFriendRequests(users);

  console.log(
    "friendRequests generated, start generating messaging...",
    millisecondsToSeconds(performance.now() - startTs)
  );

  const { chats, chatsMembers, chatsMessages } = await createChatting(users);

  console.log(
    "messaging generated, start generating and running SQL...",
    millisecondsToSeconds(performance.now() - startTs)
  );

  await client.query(
    [
      generateInsertUsersSQL(users),
      generateInsertUserAvatarsSQL(avatars),
      generateInsertPermissionsSQL(permissions),
      generateInsertRolesSQL(roles),
      generateInsertRolePermissionsSQL(rolePermissions),
      generateInsertUserRolesSQL(userRoles),
      generateInsertUserPermissionsSQL(userPermissions),
      generateInsertPostsSQL(posts),
      generateInsertPostCommentsSQL(comments),
      generateInsertReactionsSQL(reactions),
      generateInsertReactionsToPostsSQL(reactionsToPosts),
      generateFriendRequestsSQL(friendRequests),
      generateChatsSQL(chats),
      generateChatMembersSQL(chatsMembers),
      generateMessagesSQL(chatsMessages),
    ].join(";\n")
  );

  console.log(
    "SQL ran, finishing!",
    millisecondsToSeconds(performance.now() - startTs)
  );

  await client.end();
}

insertData().catch((err) => console.error(err));
