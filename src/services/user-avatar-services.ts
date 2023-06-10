import UserAvatar from "../../models/user-avatar";

export const getUserAvatars = async () => {
  try {
    const userAvatars = await UserAvatar.findAll();
    return userAvatars;
  } catch (error) {
    console.error("Error retrieving user avatars:", error);
    return null;
  }
};
