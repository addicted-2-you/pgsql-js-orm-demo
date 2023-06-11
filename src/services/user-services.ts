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
