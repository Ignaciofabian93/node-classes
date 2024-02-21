import jwt from "jsonwebtoken";
import { config } from "dotenv";
import db from "../db/db.js";

config();

// REQUEST --->>> body --- headers
export const isAuthenticated = async (req, res, next) => {
  try {
    // TOKEN --> Bearer asjsahjsahjsahsajuyweuyweuyewhdsgds
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No hay token" });

    // DECODIFICA EL TOKEN Y LO GUARDA EN LA VARIABLE DECODED
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    const { rows } = await db.query("SELECT * FROM users WHERE uid = $1", [
      decoded.uid,
    ]);
    req.body.user = rows[0];

    next();
  } catch (error) {
    console.log("Error en autenticacion: ", error);
  }
};
