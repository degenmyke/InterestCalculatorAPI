// Lightweight in-memory store to keep the project simple.
// Swap this file with a database-backed implementation later if needed.

let nextUserId = 1;
let nextLogId = 1;

const users = [];
const logs = [];

function createUser(email, passwordHash) {
  const existing = users.find((u) => u.email === email);
  if (existing) {
    throw new Error("User already exists");
  }
  const user = { id: nextUserId++, email, passwordHash };
  users.push(user);
  return user;
}

function findUserByEmail(email) {
  return users.find((u) => u.email === email);
}

function getUserById(id) {
  return users.find((u) => u.id === id);
}

function createLog({ userId = null, type, input, result }) {
  const log = {
    id: nextLogId++,
    userId,
    type,
    input,
    result,
    createdAt: new Date().toISOString(),
  };
  logs.push(log);
  return log;
}

function listLogs(userId) {
  if (!userId) return logs;
  return logs.filter((l) => l.userId === userId);
}

function updateLog(id, userId, data) {
  const log = logs.find((l) => l.id === id && (!userId || l.userId === userId));
  if (!log) return null;
  Object.assign(log, data);
  return log;
}

function deleteLog(id, userId) {
  const idx = logs.findIndex((l) => l.id === id && (!userId || l.userId === userId));
  if (idx === -1) return false;
  logs.splice(idx, 1);
  return true;
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


