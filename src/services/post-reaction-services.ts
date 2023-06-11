import getPrismaClient from "../get-prisma-client";

const prisma = getPrismaClient();

export const getPostsReactions = async () => {
  try {
    const reactions = await prisma.reactions_to_posts.findMany();
    return reactions;
  } catch (error) {
    console.error(error);
    return null;
  }
};
