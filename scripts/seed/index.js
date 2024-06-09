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
  createUserEmails,
  createUserPhones,
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
  generateInsertUserEmailsSQL,
  generateInsertUserPhonesSQL,
} = require("./generate-sql");
const { selectRoles, selectPermissions } = require("./services");
const { millisecondsToSeconds } = require("./utils");

const USERS_NUM = 2000;
const POSTS_NUM = 1500;
const COMMENTS_NUM = 3000;
const REACTIONS_TO_POSTS_NUM = 10000;

async function insertData() {
  await client.connect();

  const startTs = performance.now();

  console.info(
    "start generating users...",
    millisecondsToSeconds(performance.now() - startTs)
  );

  const users = await createUsers(USERS_NUM);

  console.info(
    "users generated, start generating user avatars...",
    millisecondsToSeconds(performance.now() - startTs)
  );

  const avatars = await createUserAvatars(users);

  console.info(
    "user avatars generated, start generating user emails...",
    millisecondsToSeconds(performance.now() - startTs)
  );

  const emails = await createUserEmails(users);

  console.info(
    "user emails generated, start generating user phones...",
    millisecondsToSeconds(performance.now() - startTs)
  );

  const phones = await createUserPhones(users);

  console.info(
    "user phones generated, start generating roles and permissions...",
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

  console.info(
    "roles and permissions generated, start generating posts...",
    millisecondsToSeconds(performance.now() - startTs)
  );

  const posts = await createPosts(users, POSTS_NUM);

  console.info(
    "posts generated, start generating comments...",
    millisecondsToSeconds(performance.now() - startTs)
  );

  const comments = await createComments(posts, users, COMMENTS_NUM);

  console.info(
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

  console.info(
    "reactions generated, start generating friendRequests...",
    millisecondsToSeconds(performance.now() - startTs)
  );

  const friendRequests = await createFriendRequests(users);

  console.info(
    "friendRequests generated, start generating messaging...",
    millisecondsToSeconds(performance.now() - startTs)
  );

  const { chats, chatsMembers, chatsMessages } = await createChatting(users);

  console.info(
    "messaging generated, start generating and running SQL...",
    millisecondsToSeconds(performance.now() - startTs)
  );

  await client.query(
    [
      generateInsertUsersSQL(users),
      generateInsertUserAvatarsSQL(avatars),
      generateInsertUserEmailsSQL(emails),
      generateInsertUserPhonesSQL(phones),
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

  console.info(
    "SQL ran, finishing!",
    millisecondsToSeconds(performance.now() - startTs)
  );

  await client.end();
}

insertData().catch((err) => console.error(err));
