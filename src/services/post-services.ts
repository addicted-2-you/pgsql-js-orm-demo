import Post from "../../models/post";

export const getPosts = async () => {
  try {
    const posts = await Post.findAll();
    return posts;
  } catch (error) {
    console.error("Error retrieving posts:", error);
    return null;
  }
};
