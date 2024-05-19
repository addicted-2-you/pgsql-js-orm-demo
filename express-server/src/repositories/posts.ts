import { pool } from "../client";
import { UpdatePostPatch } from "../types/posts";

export const findOne = async (id: string) => {
  const client = await pool.connect();

  try {
    const result = await client.query("SELECT * FROM posts WHERE id = $1", [
      id,
    ]);

    return result.rows[0];
  } finally {
    client.release();
  }
};

export const create = async (
  userId: string,
  title: string,
  content: string
) => {
  const client = await pool.connect();

  try {
    const result = await client.query(
      "INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3) RETURNING *",
      [userId, title, content]
    );

    return result.rows[0];
  } finally {
    client.release();
  }
};

export const update = async (id: string, patch: UpdatePostPatch) => {
  const client = await pool.connect();

  try {
    const values = Object.keys(patch)
      .filter(
        (field) => field && patch[field as keyof UpdatePostPatch] !== undefined
      )
      .map((field) => {
        const value = patch[field as keyof UpdatePostPatch];
        if (field === "deleted_at" && value) {
          return `deleted_at = NOW()`;
        }

        if (field === "deleted_at" && value === null) {
          return `deleted_at = NULL`;
        }

        return `${field} = '${value}'`;
      })
      .join(", ");

    const result = await client.query(
      `UPDATE posts
      SET ${values}
      WHERE id = $1
      RETURNING *`,
      [id]
    );

    return result.rows[0];
  } finally {
    client.release();
  }
};

export const destroy = async (id: string) => {
  const client = await pool.connect();

  try {
    const result = await client.query(
      `DELETE FROM posts
      WHERE id = $1
      RETURNING *`,
      [id]
    );

    return result.rows[0];
  } finally {
    client.release();
  }
};
