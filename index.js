import express from "express";
import cors from "cors";
import db from "./db/db.js";

const PORT = 3001;

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await db.query("SELECT * FROM users");
    res.send(response.rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
