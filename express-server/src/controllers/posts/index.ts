import express from "express";

import { list } from "./list";
import { findOne } from "./find-one";
import { create } from "./create";
import { update } from "./update";
import { unarchive } from "./unarchive";
import { archive } from "./archive";
import { destroy } from "./destroy";

import { authMiddleware } from "../../middlewares/auth";

const postsRouter = express.Router();

postsRouter.get("/", list);
postsRouter.get("/:id", findOne);
postsRouter.post("/", [authMiddleware], create);
postsRouter.patch("/:id", [authMiddleware], update);
postsRouter.put("/:id/unarchive", [authMiddleware], unarchive);
postsRouter.delete("/:id/archive", [authMiddleware], archive);
postsRouter.delete("/:id", [authMiddleware], destroy);

export { postsRouter };
