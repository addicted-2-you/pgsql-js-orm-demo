import PostReaction from "../../models/post-reaction";

export const getPostReactions = async () => {
  try {
    const postReactions = await PostReaction.findAll();
    return postReactions;
  } catch (error) {
    console.error("Error retrieving post reactions:", error);
    return null;
  }
};
