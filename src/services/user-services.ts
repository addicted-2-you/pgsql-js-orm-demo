import M2MUserRole from "../../models/m2m-user-role";
import Post from "../../models/post";
import User from "../../models/user";
import UserRole from "../../models/user-role";

export const getUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    console.error("Error retrieving users:", error);
    return null;
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    const user = await User.findOne({
      where: {
        username,
      },

      include: [
        {
          model: Post,
        },

        {
          model: UserRole,
          through: {
            attributes: ["id", "userId", "roleId"],
          },
        },
      ],
    });

    return user;
  } catch (error) {
    console.error("Error retrieving user:", error);
    return null;
  }
};
