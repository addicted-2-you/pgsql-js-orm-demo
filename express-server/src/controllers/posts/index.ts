import express from "express";

import { list } from "./list";
import { findOne } from "./find-one";
import { create } from "./create";
import { update } from "./update";
import { unarchive } from "./unarchive";
import { archive } from "./archive";
import { destroy } from "./destroy";

const postsRouter = express.Router();

postsRouter.get("/", list);
postsRouter.get("/:id", findOne);
postsRouter.post("/", create);
postsRouter.patch("/:id", update);
postsRouter.put("/:id/unarchive", unarchive);
postsRouter.delete("/:id/archive", archive);
postsRouter.delete("/:id", destroy);

export { postsRouter };
