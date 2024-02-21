import express from "express";
import cors from "cors";
import usuarios from "./routes/users.js";
import { readFile, writeFile, mkdir } from "fs";

// ../../ para volver atras usar ../

const PORT = 3001;

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const writeFileDemo = async (filepath, filename, data) => {
  mkdir(filepath, (err) => console.log(err));
  writeFile(`${filepath}/${filename}`, data, (err) => {
    console.log("Error: ", err);
  });
};

const fileName = "demo.txt";
const data = "Hola mundo, este es un ejemplo del modulo fs";

await writeFileDemo("./demos", fileName, data);

const readFileDemo = async (filepath) => {
  readFile(filepath, "utf8", (err, data) => {
    console.log("Error: ", err);
    console.log("Data: ", data);
  });
};

await readFileDemo(filePath);
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
