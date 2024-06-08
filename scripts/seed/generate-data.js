const { faker, ro } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

const POST_PERMISSION_TITLES = ["create_post", "delete_any_post"];

const COMMENTS_PERMISSION_TITLES = ["create_comment", "delete_any_comment"];

const REACTIONS_PERMISSION_TITLES = [
  "create_reaction",
  "create_post_reaction",
  "create_comment_reaction",
];

const PERMISSIONS_PERMISSION_TITLES = [
  "create_permissions",
  "update_permissions",
  "delete_permissions",
];

const USERS_PERMISSION_TITLES = [
  "create_users",
  "update_users",
  "delete_users",
  "ban_users",
];

const PERMISSION_TITLES = [
  ...POST_PERMISSION_TITLES,
  ...COMMENTS_PERMISSION_TITLES,
  ...REACTIONS_PERMISSION_TITLES,
  ...PERMISSIONS_PERMISSION_TITLES,
  ...USERS_PERMISSION_TITLES,
];

const ROLES_PERMISSIONS = {
  "Super Admin": [...PERMISSION_TITLES],
  Admin: [
    ...POST_PERMISSION_TITLES,
    ...COMMENTS_PERMISSION_TITLES,
    ...REACTIONS_PERMISSION_TITLES,
    ...USERS_PERMISSION_TITLES,
  ],
  User: ["create_comment", ...REACTIONS_PERMISSION_TITLES],
  "Content Creator": ["create_post"],
  Viewer: [],
};

const APPROXIMATE_FRIENDS_COUNT = 100;
const FRIENDS_COUNT_DISPERSION = 50;

const FRIEND_REQUEST_STATUSES = ["pending", "accepted", "rejected"];

const createPermissions = async () => {
  const permissions = [];

  PERMISSION_TITLES.forEach((title) => {
    permissions.push({
      id: faker.string.uuid(),
      title,
    });
  });

  return permissions;
};

const createRoles = async () => {
  const roles = [];

  Object.keys(ROLES_PERMISSIONS).forEach((title) => {
    roles.push({
      id: faker.string.uuid(),
      title,
    });
  });

  return roles;
};

const createRolePermissions = async (roles, permissions) => {
  const rolePermissions = [];

  roles.forEach((role) => {
    ROLES_PERMISSIONS[role.title].forEach((permission) => {
      rolePermissions.push({
        role_id: role.id,
        permission_id: permissions.find((p) => p.title === permission).id,
      });
    });
  });

  return rolePermissions;
};

const createUserRoles = async (users, roles) => {
  const userRoles = [];
  const userRoleId = roles.find((r) => r.title === "User").id;

  users.forEach((user) => {
    userRoles.push({
      user_id: user.id,
      role_id: userRoleId,
    });
  });

  return userRoles;
};

const createUserPermissions = async () => [];

async function createUsers(n) {
  const users = [];
  for (let i = 0; i < n; i++) {
    const username = faker.internet.userName();

    users.push({
      id: faker.string.uuid(),
      username,
      password: await bcrypt.hash(username, 10),
    });
  }
  return users;
}

async function createUserAvatars(users) {
  const avatars = [];
  for (const user of users) {
    avatars.push({
      id: faker.string.uuid(),
      user_id: user.id,
      avatar_url: faker.image.avatarGitHub(),
    });
  }
  return avatars;
}

async function createPosts(users, n) {
  const posts = [];
  for (let i = 0; i < n; i++) {
    posts.push({
      id: faker.string.uuid(),
      user_id: faker.helpers.arrayElement(users).id,
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
    });
  }
  return posts;
}

async function createComments(posts, users, n) {
  const comments = [];
  for (let i = 0; i < n; i++) {
    comments.push({
      id: faker.string.uuid(),
      post_id: faker.helpers.arrayElement(posts).id,
      user_id: faker.helpers.arrayElement(users).id,
      content: faker.lorem.sentences(),
    });
  }
  return comments;
}

const createReactions = async () => {
  const reactions = [];
  const reactionLabels = ["like", "dislike", "love", "gross", "anger"];
  for (let label of reactionLabels) {
    reactions.push({
      id: faker.string.uuid(),
      title: label,
    });
  }
  return reactions;
};

async function createReactionsToPosts(posts, users, reactions, n) {
  const reactionsToPosts = [];
  const triplets = [];
  for (let i = 0; i < n; i++) {
    const postId = faker.helpers.arrayElement(posts).id;
    const userId = faker.helpers.arrayElement(users).id;
    const reactionId = faker.helpers.arrayElement(reactions).id;

    if (
      !triplets.find(
        (t) => t[0] === postId && t[1] === userId && t[2] === reactionId
      )
    ) {
      reactionsToPosts.push({
        id: faker.string.uuid(),
        post_id: postId,
        user_id: userId,
        reaction_id: reactionId,
      });

      triplets.push([postId, userId, reactionId]);
    }
  }
  return reactionsToPosts;
}

async function createFriendRequests(users) {
  const friendRequsts = [];

  users.forEach((user) => {
    const dispersionDirection = Math.random() > 0.5 ? 1 : -1;
    for (
      let i = 0;
      i <=
      APPROXIMATE_FRIENDS_COUNT +
        Math.floor(
          FRIENDS_COUNT_DISPERSION * Math.random() * dispersionDirection
        );
      i += 1
    ) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      if (
        user.id !== randomUser.id &&
        !friendRequsts.find(
          (fr) =>
            (fr.requesterId === user.id && fr.receiverId === randomUser.id) ||
            (fr.requesterId === randomUser.id && fr.receiverId === user.id)
        )
      ) {
        friendRequsts.push({
          id: faker.string.uuid(),
          requesterId: user.id,
          receiverId: randomUser.id,
          status:
            FRIEND_REQUEST_STATUSES[
              Math.floor(Math.random() * FRIEND_REQUEST_STATUSES.length)
            ],
        });
      }
    }
  });

  return friendRequsts;
}

module.exports = {
  createPermissions,
  createRoles,
  createRolePermissions,
  createUserRoles,
  createUserPermissions,
  createUsers,

  createPosts,
  createComments,
  createReactions,
  createUserAvatars,
  createReactionsToPosts,
  createFriendRequests,
};
