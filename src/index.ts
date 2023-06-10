import knex from "knex";
import dotenv from "dotenv";

import getKnexConfig from "./get-knex-config";

// put .env variables into process.env
dotenv.config();

const db = knex(getKnexConfig());

// Example usage: Select all users from the 'users' table
db.table("users")
  .select()
  .then((users) => {
    console.log(users);
  })
  .finally(() => {
    db.destroy();
  });
