import { Request, Response } from "express";

import { pool } from "../../client";

export const list = async (req: Request, res: Response) => {
  const client = await pool.connect();
  const users = await client.query("select * from posts");
  client.release();
  return res.send(users.rows);
};
