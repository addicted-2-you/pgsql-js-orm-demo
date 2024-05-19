import { Request, Response } from "express";
import { destroyPost } from "../../services/posts";

export const destroy = async (req: Request, res: Response) => {
  try {
    const result = await destroyPost(req.params.id);
    return res.send({ data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ data: null, error });
  }
};
