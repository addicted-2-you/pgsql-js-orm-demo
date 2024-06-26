import { Request, Response } from "express";

import { createPost } from "../../services/posts";

export const create = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const result = await createPost(req.uid, title, content);
    return res.send({ data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
};
