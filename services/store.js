import { query } from "./db.js";

async function createUser(email, passwordHash) {
  const { rows } = await query(
    `INSERT INTO users (email, password_hash)
     VALUES ($1, $2)
     ON CONFLICT (email) DO NOTHING
     RETURNING id, email`,
    [email, passwordHash]
  );
  if (!rows.length) throw new Error("User already exists");
  return rows[0];
}

async function findUserByEmail(email) {
  const { rows } = await query(
    `SELECT id, email, password_hash
     FROM users
     WHERE email = $1`,
    [email]
  );
  return rows[0] || null;
}

async function getUserById(id) {
  const { rows } = await query(
    `SELECT id, email
     FROM users
     WHERE id = $1`,
    [id]
  );
  return rows[0] || null;
}

async function createLog({ userId, type, input, result }) {
  const { rows } = await query(
    `INSERT INTO logs (user_id, type, input, result)
     VALUES ($1, $2, $3, $4)
     RETURNING id,
               user_id AS "userId",
               type,
               input,
               result,
               created_at AS "createdAt"`,
    [userId, type, input, result]
  );
  return rows[0];
}

async function listLogs(userId) {
  const { rows } = await query(
    `SELECT id,
            user_id AS "userId",
            type,
            input,
            result,
            created_at AS "createdAt"
     FROM logs
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [userId]
  );
  return rows;
}

async function updateLog(id, userId, data) {
  const { type, input, result } = data;
  const { rows } = await query(
    `UPDATE logs
     SET type = COALESCE($3, type),
         input = COALESCE($4, input),
         result = COALESCE($5, result)
     WHERE id = $1 AND user_id = $2
     RETURNING id,
               user_id AS "userId",
               type,
               input,
               result,
               created_at AS "createdAt"`,
    [id, userId, type, input, result]
  );
  return rows[0] || null;
}

async function deleteLog(id, userId) {
  const { rowCount } = await query(
    `DELETE FROM logs
     WHERE id = $1 AND user_id = $2`,
    [id, userId]
  );
  return rowCount > 0;
}

export {
  createUser,
  findUserByEmail,
  getUserById,
  createLog,
  listLogs,
  updateLog,
  deleteLog,
};


