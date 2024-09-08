-- Drop tables with dependencies first
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS chat_members;
DROP TABLE IF EXISTS chats;
DROP TABLE IF EXISTS follow_requests;
DROP TABLE IF EXISTS friend_requests;
DROP TABLE IF EXISTS reactions_to_posts;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS post_views;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS user_phones;
DROP TABLE IF EXISTS user_emails;
DROP TABLE IF EXISTS user_avatars;
DROP TABLE IF EXISTS users;

-- Drop extensions if necessary
DROP EXTENSION IF EXISTS "uuid-ossp";
DROP EXTENSION IF EXISTS "pg_trgm";
