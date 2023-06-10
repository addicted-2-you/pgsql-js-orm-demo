import User from "../../models/user";

export const getUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    console.error("Error retrieving users:", error);
    return null;
  }
};
