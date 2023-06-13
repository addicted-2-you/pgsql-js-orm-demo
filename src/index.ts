import dotenv from "dotenv";

dotenv.config();

import { AppDataSource } from "./data-source";

// services
import { getUsers } from "./services/user-services";

(async () => {
  try {
    await AppDataSource.initialize();

    const users = await getUsers();
    console.log(users);
  } catch (error) {
    console.error(error);
  }
})();
