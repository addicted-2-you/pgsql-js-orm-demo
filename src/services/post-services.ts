import getPrismaClient from "../get-prisma-client";

const prisma = getPrismaClient();

export const getPosts = async () => {
  try {
    const posts = await prisma.posts.findMany();
    return posts;
  } catch (error) {
    console.error(error);
    return null;
  }
};
