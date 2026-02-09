import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// GET all tasks
router.get("/", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM tasks ORDER BY created_at DESC");
  res.json(rows);
});

// CREATE task
router.post("/", async (req, res) => {
  const { title, description, status } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title required" });
  }

  const [result] = await pool.query(
    "INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)",
    [title, description || "", status || "pending"]
  );

  res.json({ id: result.insertId });
});

// UPDATE task
router.put("/:id", async (req, res) => {
  const { title, description, status } = req.body;
  const { id } = req.params;

  await pool.query(
    "UPDATE tasks SET title=?, description=?, status=? WHERE id=?",
    [title, description, status, id]
  );

  res.json({ message: "Updated" });
});

// DELETE task
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM tasks WHERE id=?", [id]);
  res.json({ message: "Deleted" });
});

export default router;
