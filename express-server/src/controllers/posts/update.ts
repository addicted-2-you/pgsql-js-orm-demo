import { Request, Response } from "express";

import { updatePost } from "../../services/posts";

export const update = async (req: Request, res: Response) => {
  try {
    const result = await updatePost(req.params.id, req.body);
    return res.send({ data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ data: null, error });
  }
};
