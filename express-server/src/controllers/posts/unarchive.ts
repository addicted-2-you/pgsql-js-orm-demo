import { Request, Response } from "express";
import { unarchivePost } from "../../services/posts";

export const unarchive = async (req: Request, res: Response) => {
  try {
    const result = await unarchivePost(req.params.id);
    return res.send({ data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ data: null, error });
  }
};
