const { client } = require("../client");
const {
  createUsers,
  createPosts,
  createComments,
  createUserAvatars,
  createReactionsToPosts,
  createFriendRequests,
  createChatting,
  createUserEmails,
  createUserPhones,
  createPostViews,
  createFollowRequests,
} = require("./generate-data");
const {
  generateInsertUsersSQL,
  generateInsertUserAvatarsSQL,
  generateInsertPostsSQL,
  generateInsertPostCommentsSQL,
  generateInsertReactionsToPostsSQL,
  generateFriendRequestsSQL,
  generateChatsSQL,
  generateMessagesSQL,
  generateChatMembersSQL,
  generateInsertUserEmailsSQL,
  generateInsertUserPhonesSQL,
  generateInsertPostViewsSQL,
  generateFollowingRequestsSQL,
} = require("./generate-sql");
const { writeSql } = require("./services");
const { withTimeMeasureAsync, withTimeMeasureSync } = require("./utils");

const USERS_NUM = 1000;
const POSTS_NUM = USERS_NUM * 10;
const COMMENTS_NUM = 10000;
const REACTIONS_TO_POSTS_NUM = 20000;

async function insertData() {
  try {
    await client.connect();

    const users = await withTimeMeasureAsync(createUsers)(USERS_NUM);

    const avatars = await withTimeMeasureAsync(createUserAvatars)(users);

    const emails = await withTimeMeasureAsync(createUserEmails)(users);

    const phones = await withTimeMeasureAsync(createUserPhones)(users);

    const posts = await withTimeMeasureAsync(createPosts)(users, POSTS_NUM);

    const postViews = await withTimeMeasureAsync(createPostViews)(posts, users);

    const comments = await withTimeMeasureAsync(createComments)(
      posts,
      users,
      COMMENTS_NUM
    );

    const reactionsToPosts = await withTimeMeasureAsync(createReactionsToPosts)(
      posts,
      users,
      REACTIONS_TO_POSTS_NUM
    );

    const friendRequests = await withTimeMeasureAsync(createFriendRequests)(
      users
    );

    const followingRequests = await withTimeMeasureAsync(createFollowRequests)(
      users
    );

    const { chats, chatsMembers, chatsMessages } = await withTimeMeasureAsync(
      createChatting
    )(users);

    await Promise.all(
      [
        withTimeMeasureSync(generateInsertUsersSQL)(users),
        withTimeMeasureSync(generateInsertUserAvatarsSQL)(avatars),
        withTimeMeasureSync(generateInsertUserEmailsSQL)(emails),
        withTimeMeasureSync(generateInsertUserPhonesSQL)(phones),
        withTimeMeasureSync(generateInsertPostsSQL)(posts),
        withTimeMeasureSync(generateInsertPostViewsSQL)(postViews),
        withTimeMeasureSync(generateInsertPostCommentsSQL)(comments),
        withTimeMeasureSync(generateInsertReactionsToPostsSQL)(
          reactionsToPosts
        ),
        withTimeMeasureSync(generateFriendRequestsSQL)(friendRequests),
        withTimeMeasureSync(generateFollowingRequestsSQL)(followingRequests),
        withTimeMeasureSync(generateChatsSQL)(chats),
        withTimeMeasureSync(generateChatMembersSQL)(chatsMembers),
        withTimeMeasureSync(generateMessagesSQL)(chatsMessages),
      ].map((sql) => withTimeMeasureAsync(writeSql)(sql))
    );
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

withTimeMeasureAsync(insertData)().catch((err) => console.error(err));
