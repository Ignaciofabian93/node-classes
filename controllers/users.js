import db from "../db/db.js";
import jwt from "jsonwebtoken";
import { genSalt, compare, hash } from "bcrypt";
import { config } from "dotenv";

config();

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (rows) {
      const comparePassword = await compare(password, rows[0].password);
      if (comparePassword) {
        const token = jwt.sign({ uid: rows[0].uid }, process.env.JWT_TOKEN, {
          expiresIn: "1d",
        });
        return res
          .status(200)
          .json({ message: "Usuario logeado", token: token });
      } else {
        return res
          .status(401)
          .json({ message: "Credenciales incorrectas, revisa tu contraseña" });
      }
    }
  } catch (error) {
    console.log("Error en login: ", error);
  }
};

export const getUsers = async (req, res) => {
  try {
    console.log("USUARIO: ", req.body.user);
    const { rows, rowCount } = await db.query("SELECT * FROM users");
    console.log("usuarios: ", rows[0].name, "count: ", rowCount);
    res.status(200).json({
      users: rows,
      count: rowCount,
      message: "usuarios obtenidos con éxito",
    });
  } catch (error) {
    console.log("error al obtener usuarios", error);
    res.status(500).json({ juanitoperez: "error al obtener usuarios" });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const { rows } = await db.query(
      `SELECT * FROM users WHERE uid = $1 AND name = $2`, // && ||
      [id, name]
    );
    console.log("usuarios: ", rows);
    if (!rows.length)
      return res.status(404).json({ message: "usuario no encontrado" });
    res.status(200).json({
      users: rows,
      message: "usuario obtenido con éxito",
    });
  } catch (error) {
    console.log("error al obtener usuarios", error);
    res.status(500).json({ juanitoperez: "error al obtener usuarios" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const { rowCount } = await db.query(
      `UPDATE users SET name = $1, email = $2 WHERE uid = $3`,
      [name, email, id]
    );
    // console.log(response);
    res
      .status(200)
      .json({ usuariosActualizados: rowCount, message: "Usuario actualizado" });
  } catch (error) {
    console.log("Error al actualizar: ", error);
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    console.log("HASHED: ", hashedPassword);
    const response = await db.query(
      `INSERT INTO users(name, email, password) VALUES($1, $2, $3)`,
      [name, email, hashedPassword]
    );
    console.log("RES: ", response);
    res.status(201).json({ message: "Usuario creado" });
  } catch (error) {
    console.log("Error al insetar usuario: ", error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query(`DELETE FROM users WHERE uid = $1`, [id]);
    res.status(201).json({ message: "Usuario eliminado" });
  } catch (error) {
    console.log("Error al eliminar: ", error);
  }
};
