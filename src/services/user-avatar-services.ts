import getPrismaClient from "../get-prisma-client";

const prisma = getPrismaClient();

export const getUserAvatars = async () => {
  try {
    const userAvatars = await prisma.user_avatars.findMany();
    return userAvatars;
  } catch (error) {
    console.error(error);
    return null;
  }
};
