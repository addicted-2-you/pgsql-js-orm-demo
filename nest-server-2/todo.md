## Part 1 (basics)

- [x] setup the project;
  - [x] configure nest;
  - [x] configure orm;

- [x] add auth;
  - [x] add signing up;
  - [x] add signing in;
  - [x] add basic guards;

## Part 2 (basic admin routes, user cruds)

- [ ] add admin guard

- [ ] add user cruds (admin only)
  - [ ] list all
    - [ ] search by username
      - [ ] partial search
    - [ ] filter by `deleted_at`
    - [ ] have it paginated
  - [ ] update password
  - [ ] archive
  - [ ] unarchive
  - [ ] destroy

## Part 3 (posts)

- [ ] add post cruds (admin only)
  - [ ] list all
      - [ ] search by title
        - [ ] partial search
        - [ ] should be typo-tolerant
        - [ ] should be case-tolerant
      - [ ] search by content
        - [ ] partial search
        - [ ] should be typo-tolerant
        - [ ] should be case-tolerant
      - [ ] filter by `deleted_at`
      - [ ] have it paginated
  - [ ] archive
  - [ ] unarchive
  - [ ] destroy



## Part 4 (feed)

- [ ] add personalized feed v1 (no caching)
