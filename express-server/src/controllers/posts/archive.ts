import { Request, Response } from "express";
import { archivePost } from "../../services/posts";

export const archive = async (req: Request, res: Response) => {
  try {
    const result = await archivePost(req.params.id);
    return res.send({ data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ data: null, error });
  }
};
