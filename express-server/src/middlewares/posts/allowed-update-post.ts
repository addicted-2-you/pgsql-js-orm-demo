import { NextFunction, Request, Response } from "express";
import * as usersRepository from "../../repositories/users";
import * as postsRepository from "../../repositories/posts";

export const allowedUpdatePostMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const post = await postsRepository.findOne(req.params.id);

  const userWithPermissions = await usersRepository.findOneWithRolesPermissions(
    req.uid
  );

  if (
    post?.user_id !== req.uid &&
    !userWithPermissions?.find(
      (user) => user.role === "Admin" || user.role === "Super Admin"
    )
  ) {
    return res.sendStatus(403);
  }

  next();
};
