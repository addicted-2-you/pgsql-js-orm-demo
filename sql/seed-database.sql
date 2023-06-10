-- Insert test data into the 'users' table
INSERT INTO users (id, username, created_at, updated_at)
VALUES
  (uuid_generate_v4(), 'john_doe', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (uuid_generate_v4(), 'jane_smith', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert test data into the 'posts' table
INSERT INTO posts (id, user_id, title, content, created_at, updated_at)
VALUES
  (uuid_generate_v4(), (SELECT id FROM users WHERE username = 'john_doe'), 'Post 1', 'Content of post 1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (uuid_generate_v4(), (SELECT id FROM users WHERE username = 'john_doe'), 'Post 2', 'Content of post 2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (uuid_generate_v4(), (SELECT id FROM users WHERE username = 'jane_smith'), 'Post 3', 'Content of post 3', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert test data into the 'comments' table
INSERT INTO comments (id, post_id, user_id, content, created_at, updated_at)
VALUES
  (uuid_generate_v4(), (SELECT id FROM posts WHERE title = 'Post 1'), (SELECT id FROM users WHERE username = 'jane_smith'), 'Comment on post 1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (uuid_generate_v4(), (SELECT id FROM posts WHERE title = 'Post 2'), (SELECT id FROM users WHERE username = 'john_doe'), 'Comment on post 2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (uuid_generate_v4(), (SELECT id FROM posts WHERE title = 'Post 2'), (SELECT id FROM users WHERE username = 'jane_smith'), 'Another comment on post 2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert test data into the 'reactions_to_posts' table
INSERT INTO reactions_to_posts (id, user_id, post_id, reaction_type, created_at, updated_at)
VALUES
  (uuid_generate_v4(), (SELECT id FROM users WHERE username = 'john_doe'), (SELECT id FROM posts WHERE title = 'Post 1'), 'Like', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (uuid_generate_v4(), (SELECT id FROM users WHERE username = 'jane_smith'), (SELECT id FROM posts WHERE title = 'Post 1'), 'Love', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (uuid_generate_v4(), (SELECT id FROM users WHERE username = 'jane_smith'), (SELECT id FROM posts WHERE title = 'Post 2'), 'Like', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert test data into the 'user_avatars' table
INSERT INTO user_avatars (id, user_id, avatar_url, created_at, updated_at)
VALUES
  (uuid_generate_v4(), (SELECT id FROM users WHERE username = 'john_doe'), 'https://example.com/avatar1.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (uuid_generate_v4(), (SELECT id FROM users WHERE username = 'jane_smith'), 'https://example.com/avatar2.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
