import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.SECRET_JWT_KEY!, (err, user: any) => {
    if (err || !user?.uid) {
      return res.sendStatus(401);
    }

    req.uid = user.uid;
    next();
  });
};
