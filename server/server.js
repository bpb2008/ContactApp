import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Pool } from "pg";

dotenv.config();

app.use(
  cors({
    origin: process.env.URL || "http://localhost:5173",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
  })
);

const app = express();
const port = process.env.PORT;

const pool = new Pool({
  user: process.env.DATABASE_USERNAME,
  host: process.env.LOCALHOST_URL,
  database: process.env.DATABASE,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

app.get("/contacts", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM contacts");
    res.json(result.rows);
  } catch (error) {
    console.log("Some drama happened with this query! I'm an error!", error);
    res.status(500).json({ error: "Internal Service Error" });
  }
});

app.listen(port, () => {
  console.log(`AYYYY server is running on port ${port}`);
});
