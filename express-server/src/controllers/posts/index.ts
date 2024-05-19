import express from "express";

import { list } from "./list";
import { findOne } from "./find-one";
import { create } from "./create";
import { update } from "./update";
import { unarchive } from "./unarchive";
import { archive } from "./archive";
import { destroy } from "./destroy";

import { authMiddleware } from "../../middlewares/auth";
import { allowedCreatePostsMiddleware } from "../../middlewares/posts/allowed-create-posts";
import { allowedUpdatePostMiddleware } from "../../middlewares/posts/allowed-update-post";

const postsRouter = express.Router();

postsRouter.get("/", list);
postsRouter.get("/:id", findOne);
postsRouter.post("/", [authMiddleware, allowedCreatePostsMiddleware], create);
postsRouter.patch(
  "/:id",
  [authMiddleware, allowedUpdatePostMiddleware],
  update
);
postsRouter.put(
  "/:id/unarchive",
  [authMiddleware, allowedUpdatePostMiddleware],
  unarchive
);
postsRouter.delete(
  "/:id/archive",
  [authMiddleware, allowedUpdatePostMiddleware],
  archive
);
postsRouter.delete(
  "/:id",
  [authMiddleware, allowedUpdatePostMiddleware],
  destroy
);

export { postsRouter };
