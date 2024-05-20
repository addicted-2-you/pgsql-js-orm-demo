import { Request, Response } from "express";

import * as postsRepository from "../../repositories/posts";

const validOrderByFields = ["created_at", "title"];

export const list = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string);
    const limit = parseInt(req.query.limit as string);
    const offset = (page - 1) * limit;
    const orderBy = validOrderByFields.includes(req.query.orderBy as string)
      ? (req.query.orderBy as string)
      : "created_at";

    let posts = [];
    if (req.query.page && req.query.limit) {
      posts = await postsRepository.listPage(limit, offset, orderBy);
    } else {
      posts = await postsRepository.list(orderBy);
    }

    return res.send({ data: posts });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
};
