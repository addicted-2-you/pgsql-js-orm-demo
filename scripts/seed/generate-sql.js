const generateInsertUsersSQL = (users) => {
  if (!users.length) {
    return "";
  }

  const values = users
    .map((user) => `('${user.id}', '${user.username}', '${user.password}')`)
    .join(",\n");
  return `INSERT INTO users (id, username, password) VALUES\n${values};`;
};

const generateInsertUserAvatarsSQL = (userAvatars) => {
  if (!userAvatars.length) {
    return "";
  }

  const values = userAvatars
    .map(
      (avatar) =>
        `('${avatar.id}', '${avatar.user_id}', '${avatar.avatar_url}')`
    )
    .join(",\n");
  return `INSERT INTO user_avatars (id, user_id, avatar_url) VALUES\n${values};`;
};

const generateInsertUserEmailsSQL = (userEmails) => {
  if (!userEmails.length) {
    return "";
  }

  const values = userEmails
    .map(
      (ue) => `('${ue.id}', '${ue.userId}', '${ue.email}', '${ue.isVerified}')`
    )
    .join(",\n");
  return `INSERT INTO user_emails (id, user_id, email, is_verified) VALUES\n${values};`;
};

const generateInsertUserPhonesSQL = (userPhones) => {
  if (!userPhones.length) {
    return "";
  }

  const values = userPhones
    .map(
      (up) => `('${up.id}', '${up.userId}', '${up.phone}', '${up.isVerified}')`
    )
    .join(",\n");
  return `INSERT INTO user_phones (id, user_id, phone, is_verified) VALUES\n${values};`;
};

const generateInsertPostsSQL = (posts) => {
  if (!posts.length) {
    return "";
  }

  const values = posts
    .map(
      (post) =>
        `('${post.id}', '${post.user_id}', '${post.title}', '${post.content}', '${post.createdAt}')`
    )
    .join(",\n");
  return `INSERT INTO posts (id, user_id, title, content, created_at) VALUES\n${values};`;
};

const generateInsertPostViewsSQL = (postViews) => {
  if (!postViews.length) {
    return "";
  }

  const values = postViews
    .map(
      (pv) =>
        `('${pv.id}', '${pv.postId}', ${
          pv.userId ? `'${pv.userId}'` : null
        }, '${pv.viewedAt}')`
    )
    .join(",\n");
  return `INSERT INTO post_views (id, post_id, user_id, viewed_at) VALUES\n${values};`;
};

const generateInsertPostCommentsSQL = (comments) => {
  if (!comments.length) {
    return "";
  }

  const values = comments
    .map(
      (comment) =>
        `('${comment.id}', '${comment.post_id}', '${comment.user_id}', '${comment.content}', '${comment.createdAt}')`
    )
    .join(",\n");
  return `INSERT INTO comments (id, post_id, user_id, content, created_at) VALUES\n${values};`;
};

const generateInsertReactionsToPostsSQL = (reactions) => {
  if (!reactions.length) {
    return "";
  }

  const values = reactions
    .map(
      (rtp) =>
        `('${rtp.id}', '${rtp.user_id}', '${rtp.post_id}', '${rtp.createdAt}')`
    )
    .join(",\n");
  return `INSERT INTO reactions_to_posts (id, user_id, post_id, created_at) VALUES\n${values};`;
};

const generateFriendRequestsSQL = (friendRequests) => {
  if (!friendRequests.length) {
    return "";
  }

  const values = friendRequests
    .map(
      (fr) =>
        `('${fr.id}', '${fr.requesterId}', '${fr.receiverId}', '${fr.status}')`
    )
    .join(",\n");
  return `INSERT INTO friend_requests (id, requester_id, receiver_id, status) VALUES\n${values};`;
};

const generateChatsSQL = (chats) => {
  if (!chats.length) {
    return "";
  }

  const values = chats.map((c) => `('${c.id}', '${c.name}')`).join(",\n");
  return `INSERT INTO chats (id, name) VALUES\n${values};`;
};

const generateChatMembersSQL = (chatMembers) => {
  if (!chatMembers.length) {
    return "";
  }

  const values = chatMembers
    .map((cm) => `('${cm.chatId}', '${cm.userId}')`)
    .join(",\n");
  return `INSERT INTO chat_members (chat_id, user_id) VALUES\n${values};`;
};

const generateMessagesSQL = (messages) => {
  if (!messages.length) {
    return "";
  }

  const values = messages
    .map(
      (m) =>
        `('${m.id}', '${m.chatId}', '${m.senderId}', '${m.type}', '${m.content}', '${m.createdAt}')`
    )
    .join(",\n");
  return `INSERT INTO messages (id, chat_id, sender_id, type, content, created_at) VALUES\n${values};`;
};

module.exports = {
  generateInsertUsersSQL,
  generateInsertUserAvatarsSQL,
  generateInsertUserEmailsSQL,
  generateInsertUserPhonesSQL,
  generateInsertPostsSQL,
  generateInsertPostViewsSQL,
  generateInsertPostCommentsSQL,
  generateInsertReactionsToPostsSQL,
  generateFriendRequestsSQL,
  generateChatsSQL,
  generateChatMembersSQL,
  generateMessagesSQL,
};
