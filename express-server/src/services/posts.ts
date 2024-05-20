import * as postsRepository from "../repositories/posts";

import { UpdatePostPatch } from "../types/posts";

export const createPost = async (
  userId: string,
  title: string,
  content: string
) => {
  return await postsRepository.create(userId, title, content);
};

export const updatePost = async (id: string, patch: UpdatePostPatch) => {
  if (!Object.keys(patch).length) {
    throw new Error("Please provide fields to update");
  }

  return await postsRepository.update(id, patch);
};

export const archivePost = async (id: string) => {
  return await postsRepository.update(id, {
    deleted_at: "true",
  });
};

export const unarchivePost = async (id: string) => {
  return await postsRepository.update(id, {
    deleted_at: null,
  });
};

export const destroyPost = async (id: string) => {
  return await postsRepository.destroy(id);
};
