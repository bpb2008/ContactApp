import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pg from "pg";

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT;
const { Pool } = pg;

app.use(
  cors({
    origin: process.env.URL || "http://localhost:5173",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
  })
);

const pool = new Pool({
  connectionString: process.env.LOCALHOST_DATABASE_URL,
});

app.get("/contacts", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM contacts");
    res.json(result.rows);
  } catch (error) {
    console.log("Error fetching contact list: ", error);
    res.status(500).json({ error: "Internal Service Error" });
  }
});

app.get("/contacts/:id", async (req, res) => {
  const contactId = req.params.id;
  try {
    const result = await pool.query(
      "SELECT * FROM contacts WHERE contact_id = $1",
      [contactId]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Contact not found!" });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.log("Error fetching individual contact details: ", error);
    res.status(500).json({ error: "Internal Service Error" });
  }
});

app.post("/addContact", async (req, res) => {
  const { name, email, phone, notes } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO contacts (name, email, phone, notes) VALUES($1, $2, $3, $4) RETURNING *",
      [name, email, phone, notes]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.log("Error adding new contact: ", error);
    res.status(500).json({ error: "Internal Service Error" });
  }
});

app.delete("/contacts/:id", async (req, res) => {
  const contactId = req.params.id;
  try {
    await pool.query("DELETE FROM contacts WHERE contact_id = $1", [contactId]);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting contact: ", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`AYYYY server is running on port ${port}`);
});
