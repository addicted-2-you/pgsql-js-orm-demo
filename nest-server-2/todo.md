## Part 1 (basics)

- [x] setup the project;
  - [x] configure nest;
  - [x] configure orm;

- [x] add auth;
  - [x] add signing up;
  - [x] add signing in;
  - [x] add basic guards;

## Part 2 (basic admin routes, user cruds)

- [x] add admin guard

- [x] add user cruds (admin only)
  - [x] list all
    - [x] search by username
      - [x] partial search
    - [x] have it paginated
  - [x] get one
  - [x] update password
  - [x] archive
  - [x] unarchive
  - [x] destroy

## Part 3 (posts)

- [x] add post cruds (admin only)
  - [x] list all
      - [x] search by title
        - [x] partial search
        - [ ] should be typo-tolerant
        - [x] should be case-tolerant
      - [x] search by content
        - [x] partial search
        - [ ] should be typo-tolerant
        - [x] should be case-tolerant
      - [x] filter by `deleted_at`
      - [x] have it paginated
  - [x] get one
  - [x] archive
  - [x] unarchive
  - [x] destroy



## Part 4 (feed)

- [ ] add personalized feed v1 (no caching)
