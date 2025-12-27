import { Router } from "express";
import {
  createLog,
  listLogs,
  updateLog,
  deleteLog,
} from "../services/store.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

// List logs for the authenticated user
router.get("/api/logs", authMiddleware, async (req, res) => {
  const data = await listLogs(req.user.id);
  res.json({ logs: data });
});

// Create a log entry
router.post("/api/logs", authMiddleware, async (req, res) => {
  const { type, input, result } = req.body || {};
  if (!type) return res.status(400).json({ error: "type is required" });
  const log = await createLog({
    userId: req.user.id,
    type,
    input: input || {},
    result: result || {},
  });
  res.status(201).json(log);
});

// Update a log entry
router.put("/api/logs/:id", authMiddleware, async (req, res) => {
  const id = Number(req.params.id);
  const updated = await updateLog(id, req.user.id, req.body || {});
  if (!updated) return res.status(404).json({ error: "Log not found" });
  res.json(updated);
});

// Delete a log entry
router.delete("/api/logs/:id", authMiddleware, async (req, res) => {
  const id = Number(req.params.id);
  const ok = await deleteLog(id, req.user.id);
  if (!ok) return res.status(404).json({ error: "Log not found" });
  res.status(204).send();
});

export default router;


