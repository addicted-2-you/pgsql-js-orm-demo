import { Request, Response } from "express";

import * as postsRepository from "../../repositories/posts";

export const findOne = async (req: Request, res: Response) => {
  try {
    const post = await postsRepository.findOne(req.params.id);
    return res.send({ data: post });
  } catch (error) {
    console.log(error);
    return res.send({ data: null, error: error });
  }
};
