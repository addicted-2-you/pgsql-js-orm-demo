const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

const { sanitazeSqlString } = require("./utils");

const APPROXIMATE_FRIENDS_COUNT = 100;
const FRIENDS_COUNT_DISPERSION = 50;

const APPROXIMATE_FOLLOWERS_COUNT = 100;
const FOLLOWERS_COUNT_DISPERSION = 50;

const APPROXIMATE_CHATS_COUNT = 5;
const CHATS_COUNT_DISPERSION = 1;

const APPROXIMATE_CHAT_MEMBERS_COUNT = 10;

const APPROXIMATE_MESSAGES_COUNT = 100;

const FRIEND_REQUEST_STATUSES = ["pending", "accepted", "rejected"];
const FOLLOWING_REQUEST_STATUSES = ["pending", "accepted", "rejected"];

async function createUsers(n) {
  const users = [];
  for (let i = 0; i < n; i++) {
    const username = sanitazeSqlString(faker.internet.userName());

    users.push({
      id: faker.string.uuid(),
      username,
      password: await bcrypt.hash(username, 1), // 1 salt round is ONLY to speed up the generation, in real projects it should be about 10
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

async function createUserEmails(users) {
  const emails = [];

  users.forEach((user) => {
    const email = faker.internet.email();
    if (!emails.find((e) => e.email === email)) {
      // not all users have emails
      if (Math.random() > 0.5) {
        emails.push({
          id: faker.string.uuid(),
          userId: user.id,
          email,
          isVerified: Math.random() > 0.5,
        });
      }
    }
  });

  return emails;
}

async function createUserPhones(users) {
  const phones = [];

  users.forEach((user) => {
    const phone = faker.phone.number();
    if (!phones.find((p) => p.phone === phone)) {
      // not all users have phones
      if (Math.random() > 0.5) {
        phones.push({
          id: faker.string.uuid(),
          userId: user.id,
          phone,
          isVerified: Math.random() > 0.5,
        });
      }
    }
  });

  return phones;
}

async function createPosts(users, n) {
  const posts = [];
  for (let i = 0; i < n; i++) {
    posts.push({
      id: faker.string.uuid(),
      user_id: faker.helpers.arrayElement(users).id,
      title: sanitazeSqlString(faker.lorem.sentence()),
      content: sanitazeSqlString(faker.lorem.paragraphs()),
      createdAt: faker.date.past({ years: 10 }).toISOString(),
    });
  }
  return posts;
}

async function createPostViews(posts, users) {
  const minPostsViews = Math.floor(users.length / 2);

  const postViews = [];

  posts.forEach((post) => {
    const postViewsMap = {}; // { [postId]: { [userId]: true } }

    for (
      let i = 0;
      i < minPostsViews + Math.floor(minPostsViews * Math.random());
      i += 1
    ) {
      const userId =
        Math.random() > 0.5 ? faker.helpers.arrayElement(users).id : null;

      if (
        userId &&
        (!postViewsMap[post.id] || !postViewsMap[post.id][userId])
      ) {
        postViews.push({
          id: faker.string.uuid(),
          postId: post.id,
          userId,
          viewedAt: faker.date.soon({ refDate: post.createdAt }).toISOString(),
        });

        if (!postViewsMap[post.id]) {
          postViewsMap[post.id] = { [userId]: true };
        } else {
          postViewsMap[post.id][userId] = true;
        }
      }
    }
  });

  return postViews;
}

async function createComments(posts, users, n) {
  const comments = [];
  for (let i = 0; i < n; i++) {
    const randomPost = faker.helpers.arrayElement(posts);
    comments.push({
      id: faker.string.uuid(),
      post_id: randomPost.id,
      user_id: faker.helpers.arrayElement(users).id,
      content: sanitazeSqlString(faker.lorem.sentences()),
      createdAt: faker.date
        .soon({ refDate: randomPost.createdAt })
        .toISOString(),
    });
  }
  return comments;
}

async function createReactionsToPosts(posts, users, n) {
  const reactionsToPosts = [];
  const reactionsMap = {}; // { [`${postId}@@${userId}`]: true }
  for (let i = 0; i < n; i++) {
    const randomPost = faker.helpers.arrayElement(posts);
    const userId = faker.helpers.arrayElement(users).id;

    if (!reactionsMap[`${randomPost.id}@@${userId}`]) {
      reactionsToPosts.push({
        id: faker.string.uuid(),
        post_id: randomPost.id,
        user_id: userId,
        createdAt: faker.date
          .soon({ refDate: randomPost.createdAt })
          .toISOString(),
      });

      reactionsMap[`${randomPost.id}@@${userId}`] = true;
    }
  }
  return reactionsToPosts;
}

async function createFriendRequests(users) {
  const friendRequests = [];
  const friendRequestsMap = {}; // { [requesterId]: { [receiverId]: true } }

  users.forEach((user) => {
    const dispersionDirection = Math.random() > 0.5 ? 1 : -1;
    for (
      let i = 0;
      i <=
      APPROXIMATE_FRIENDS_COUNT +
        Math.floor(FRIENDS_COUNT_DISPERSION * Math.random()) *
          dispersionDirection;
      i += 1
    ) {
      const randomUser = faker.helpers.arrayElement(users);
      if (
        user.id !== randomUser.id &&
        (!friendRequestsMap[user.id] ||
          !friendRequestsMap[user.id][randomUser.id]) &&
        (!friendRequestsMap[randomUser.id] ||
          friendRequestsMap[randomUser.id][user.id])
      ) {
        friendRequests.push({
          id: faker.string.uuid(),
          requesterId: user.id,
          receiverId: randomUser.id,
          status: faker.helpers.arrayElement(FRIEND_REQUEST_STATUSES),
        });

        if (!friendRequestsMap[user.id]) {
          friendRequestsMap[user.id] = { [randomUser.id]: true };
        } else {
          friendRequestsMap[user.id][randomUser.id] = true;
        }
      }
    }
  });

  return friendRequests;
}

async function createFollowRequests(users) {
  const followRequests = [];
  const followRequestsMap = {}; // { [followerId]: { [followeeId]: true } }

  users.forEach((user) => {
    const dispersionDirection = Math.random() > 0.5 ? 1 : -1;
    for (
      let i = 0;
      i <=
      APPROXIMATE_FOLLOWERS_COUNT +
        Math.floor(FOLLOWERS_COUNT_DISPERSION * Math.random()) *
          dispersionDirection;
      i += 1
    ) {
      const randomUser = faker.helpers.arrayElement(users);
      if (
        user.id !== randomUser.id &&
        (!followRequestsMap[user.id] ||
          !followRequestsMap[user.id][randomUser.id]) &&
        (!followRequestsMap[randomUser.id] ||
          followRequestsMap[randomUser.id][user.id])
      ) {
        followRequests.push({
          id: faker.string.uuid(),
          followerId: user.id,
          followeeId: randomUser.id,
          status: faker.helpers.arrayElement(FOLLOWING_REQUEST_STATUSES),
        });

        if (!followRequestsMap[user.id]) {
          followRequestsMap[user.id] = { [randomUser.id]: true };
        } else {
          followRequestsMap[user.id][randomUser.id] = true;
        }
      }
    }
  });

  return followRequests;
}

async function createChatting(users) {
  const chats = [];
  const chatsMembers = {};
  const chatsMessages = [];
  const existingChats = new Set();

  users.forEach((user) => {
    const dispersionDirection = Math.random() > 0.5 ? 1 : -1;

    for (
      let i = 0;
      i <
      APPROXIMATE_CHATS_COUNT +
        Math.floor(CHATS_COUNT_DISPERSION * Math.random()) *
          dispersionDirection;
      i += 1
    ) {
      const chat = {
        id: faker.string.uuid(),
        name: sanitazeSqlString(faker.company.buzzNoun()),
      };
      const chatMembersMap = { [user.id]: true };
      const messages = [];
      for (
        let j = 0;
        j < Math.floor(APPROXIMATE_CHAT_MEMBERS_COUNT * Math.random());
        j += 1
      ) {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        if (user !== randomUser.id && !chatMembersMap[randomUser.id]) {
          chatMembersMap[randomUser.id] = true;
        }
      }

      const chatMembersArray = Object.keys(chatMembersMap);
      const chatMembersKey = chatMembersArray.sort().join("@@");
      if (!existingChats.has(chatMembersKey)) {
        for (
          let k = 0;
          k < Math.floor(APPROXIMATE_MESSAGES_COUNT * Math.random());
          k += 1
        ) {
          messages.push({
            id: faker.string.uuid(),
            chatId: chat.id,
            senderId: faker.helpers.arrayElement(chatMembersArray),
            type: "text",
            content: sanitazeSqlString(
              faker.word.words({ count: { min: 5, max: 15 } })
            ),
            createdAt: faker.date.recent().toISOString(),
          });
        }
      }

      if (messages.length) {
        chats.push(chat);
        chatsMembers[chat.id] = chatMembersMap;
        chatsMessages.push(...messages);
        existingChats.add(chatMembersKey);
      }
    }
  });

  return {
    chats,
    chatsMembers: Object.entries(chatsMembers).reduce(
      (acc, [chatId, members]) => {
        const flattenMembers = [];
        Object.keys(members).forEach((userId) => {
          flattenMembers.push({
            chatId,
            userId,
          });
        });

        return acc.concat(flattenMembers);
      },
      []
    ),
    chatsMessages,
  };
}

module.exports = {
  createUsers,

  createPosts,
  createPostViews,
  createComments,
  createUserAvatars,
  createUserEmails,
  createUserPhones,
  createReactionsToPosts,
  createFriendRequests,
  createFollowRequests,
  createChatting,
};
