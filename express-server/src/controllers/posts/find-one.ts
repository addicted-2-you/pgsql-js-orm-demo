import { Request, Response } from "express";

import { pool } from "../../client";

export const findOne = async (req: Request, res: Response) => {
  const client = await pool.connect();
  try {
    const users = await client.query(
      `select * from posts where id = '${req.params.id}'`
    );

    return res.send({ data: users.rows });
  } catch (error) {
    console.log(error);
    return res.send({ data: null, error: error });
  } finally {
    client.release();
  }
};
