import Comment from "../../models/comment";

export const getComments = async () => {
  try {
    const comments = await Comment.findAll();
    return comments;
  } catch (error) {
    console.error("Error retrieving comments:", error);
    return null;
  }
};
