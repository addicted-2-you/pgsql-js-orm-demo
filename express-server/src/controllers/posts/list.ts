import { Request, Response } from "express";

import * as postsRepository from "../../repositories/posts";

export const list = async (req: Request, res: Response) => {
  try {
    const users = await postsRepository.list();
    return res.send({ data: users });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
};
