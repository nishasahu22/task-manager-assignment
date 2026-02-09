import express from "express";   //u50wmEnluYwkup69
import cors from "cors";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running ✅ Use /health");
});

app.get("/health", (req, res) => {
  res.json({ ok: true, message: "Backend running" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
