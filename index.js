import express from "express";
import cors from "cors";
import db from "./db/db.js";
import usuarios from "./routes/users.js";

// ../../ para volver atras usar ../

const PORT = 3001;

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// http y https
// http no tiene protocolo de seguridad (SSL)
// https tiene protocolo de seguridad (SSL)

// http://localhost:3001/api
// app.get("/", async (req, res) => {
//   try {
//     const response = await db.query("SELECT name, email FROM users");
//     res.send(response.rows);
//   } catch (error) {
//     console.error("Error executing query:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// http://localhost:3001/api/users

app.use("/api/users", usuarios);
// app.use("/api/products", usuarios);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
