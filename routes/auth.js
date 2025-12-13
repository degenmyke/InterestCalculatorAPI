import { Router } from "express";
import bcrypt from "bcryptjs";
import { createUser, findUserByEmail } from "../services/store.js";
import { signToken, authMiddleware } from "../middleware/auth.js";

const router = Router();

router.post("/api/register", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = createUser(email, hash);
    const token = signToken(user);
    return res.json({ token, user: { id: user.id, email: user.email } });
  } catch (err) {
    return res.status(400).json({ error: err.message || "Registration failed" });
  }
});

router.post("/api/login", async (req, res) => {
  const { email, password } = req.body || {};
  const user = findUserByEmail(email);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const token = signToken(user);
  return res.json({ token, user: { id: user.id, email: user.email } });
});

router.get("/api/profile", authMiddleware, (req, res) => {
  return res.json({ id: req.user.id, email: req.user.email });
});

export default router;


