import getPrismaClient from "../get-prisma-client";

const prisma = getPrismaClient();

export const getUsers = async () => {
  try {
    const users = await prisma.users.findMany();
    return users;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUserData = async (username: string) => {
  try {
    const user = await prisma.users.findFirstOrThrow({
      where: {
        username,
      },

      include: {
        posts: true,

        comments: true,

        reactions_to_posts: true,

        M2M_UserRole: {
          include: {
            role: true,
          },
        },
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
