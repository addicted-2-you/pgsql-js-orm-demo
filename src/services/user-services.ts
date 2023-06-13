import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export const getUsers = async () => {
  try {
    const users = await AppDataSource.getRepository(User).find({
      relations: ["avatar", "posts"],
    });
    return users;
  } catch (error) {
    console.error(error);
  }
};
