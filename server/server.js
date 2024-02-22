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
    const result = await pool.query("SELECT * FROM contacts ORDER BY name ASC");
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

  if (!name || !email || !phone) {
    return res
      .status(400)
      .json({ error: "Name, Email, and Phone are required fields." });
  }

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

app.put("/editContact/:id", async (req, res) => {
  const contactId = req.params.id;
  const { newName, newEmail, newPhone, newNotes } = req.body;
  try {
    await pool.query(
      "UPDATE contacts SET name = $1, email = $2, phone = $3, notes = $4 WHERE contact_id = $5",
      [newName, newEmail, newPhone, newNotes, contactId]
    );
    res.json({
      success: true,
      message: `Entry with ID ${contactId} updated successfully.`,
    });
  } catch (error) {
    console.error("Error updating contact: ", error);
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
