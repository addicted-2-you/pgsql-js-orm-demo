const generateInsertUsersSQL = (users) =>
  users
    .map(
      (user) =>
        `INSERT INTO users (id, username, password) VALUES ('${user.id}', '${user.username}', '${user.password}')`
    )
    .join(";\n");

const generateInsertUserAvatarsSQL = (userAvatars) =>
  userAvatars
    .map(
      (avatar) =>
        `INSERT INTO user_avatars (id, user_id, avatar_url) VALUES ('${avatar.id}', '${avatar.user_id}', '${avatar.avatar_url}')`
    )
    .join(";\n");

const generateInsertUserEmailsSQL = (userEmails) =>
  userEmails
    .map(
      (ue) =>
        `INSERT INTO user_emails (id, user_id, email, is_verified) VALUES ('${ue.id}', '${ue.userId}', '${ue.email}', '${ue.isVerified}')`
    )
    .join(";\n");

const generateInsertUserPhonesSQL = (userPhones) =>
  userPhones
    .map(
      (up) =>
        `INSERT INTO user_phones (id, user_id, phone, is_verified) VALUES ('${up.id}', '${up.userId}', '${up.phone}', '${up.isVerified}')`
    )
    .join(";\n");

const generateInsertPermissionsSQL = (permissions) =>
  permissions
    .map(
      (permission) =>
        `INSERT INTO permissions (id, title) VALUES ('${permission.id}', '${permission.title}')`
    )
    .join(";\n");

const generateInsertRolesSQL = (roles) =>
  roles
    .map(
      (role) =>
        `INSERT INTO roles (id, title) VALUES ('${role.id}', '${role.title}')`
    )
    .join(";\n");

const generateInsertRolePermissionsSQL = (rolePermissions) =>
  rolePermissions
    .map(
      (rp) =>
        `INSERT INTO role_permissions (role_id, permission_id) VALUES ('${rp.role_id}', '${rp.permission_id}')`
    )
    .join(";\n");

const generateInsertUserRolesSQL = (userRoles) =>
  userRoles
    .map(
      (ur) =>
        `INSERT INTO user_roles (user_id, role_id) VALUES ('${ur.user_id}', '${ur.role_id}')`
    )
    .join(";\n");

const generateInsertUserPermissionsSQL = (userPermissions) =>
  userPermissions
    .map(
      (up) =>
        `INSERT INTO user_roles (user_id, permission_id) VALUES ('${up.user_id}', '${up.permission_id}')`
    )
    .join(";\n");

const generateInsertPostsSQL = (posts) =>
  posts
    .map(
      (post) =>
        `INSERT INTO posts (id, user_id, title, content, created_at) VALUES ('${post.id}', '${post.user_id}', '${post.title}', '${post.content}', '${post.createdAt}')`
    )
    .join(";\n");

const generateInsertPostViewsSQL = (postViews) =>
  postViews
    .map(
      (pv) =>
        `INSERT INTO post_views (id, post_id, user_id, viewed_at) VALUES ('${
          pv.id
        }', '${pv.postId}', ${pv.userId ? `'${pv.userId}'` : null}, '${
          pv.viewedAt
        }')`
    )
    .join(";\n");

const generateInsertPostCommentsSQL = (comments) =>
  comments
    .map(
      (comment) =>
        `INSERT INTO comments (id, post_id, user_id, content, created_at) VALUES ('${comment.id}', '${comment.post_id}','${comment.user_id}','${comment.content}', '${comment.createdAt}')`
    )
    .join(";\n");

const generateInsertReactionsSQL = (reactions) =>
  reactions
    .map(
      (reaction) =>
        `INSERT INTO reactions (id, title) VALUES ('${reaction.id}', '${reaction.title}')`
    )
    .join(";\n");

const generateInsertReactionsToPostsSQL = (reactions) =>
  reactions
    .map(
      (rtp) =>
        `INSERT INTO reactions_to_posts (id, user_id, post_id, reaction_id, created_at) VALUES ('${rtp.id}', '${rtp.user_id}','${rtp.post_id}','${rtp.reaction_id}', '${rtp.createdAt}')`
    )
    .join(";\n");

const generateFriendRequestsSQL = (friendRequests) =>
  friendRequests
    .map(
      (fr) =>
        `INSERT INTO friend_requests (id, requester_id, receiver_id, status) VALUES ('${fr.id}', '${fr.requesterId}', '${fr.receiverId}', '${fr.status}')`
    )
    .join(";\n");

const generateChatsSQL = (chats) =>
  chats
    .map((c) => `INSERT INTO chats (id, name) VALUES ('${c.id}', '${c.name}')`)
    .join(";\n");

const generateChatMembersSQL = (chatMembers) =>
  chatMembers
    .map(
      (cm) =>
        `INSERT INTO chat_members (chat_id, user_id) VALUES ('${cm.chatId}', '${cm.userId}')`
    )
    .join(";\n");

const generateMessagesSQL = (messages) =>
  messages
    .map(
      (m) =>
        `INSERT INTO messages (id, chat_id, sender_id, type, content, created_at) VALUES ('${m.id}', '${m.chatId}', '${m.senderId}', '${m.type}', '${m.content}', '${m.createdAt}')`
    )
    .join(";\n");

module.exports = {
  generateInsertUsersSQL,
  generateInsertUserAvatarsSQL,
  generateInsertUserEmailsSQL,
  generateInsertUserPhonesSQL,
  generateInsertPermissionsSQL,
  generateInsertRolesSQL,
  generateInsertRolePermissionsSQL,
  generateInsertUserRolesSQL,
  generateInsertUserPermissionsSQL,
  generateInsertPostsSQL,
  generateInsertPostViewsSQL,
  generateInsertPostCommentsSQL,
  generateInsertReactionsSQL,
  generateInsertReactionsToPostsSQL,
  generateFriendRequestsSQL,
  generateChatsSQL,
  generateChatMembersSQL,
  generateMessagesSQL,
};
