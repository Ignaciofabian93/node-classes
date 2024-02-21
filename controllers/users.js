import db from "../db/db.js";
import * as jwt from "jsonwebtoken";
import { genSalt, compare, hash } from "bcrypt";

export const getUsers = async (req, res) => {
  try {
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
    const { name, email } = req.body;
    const response = await db.query(
      `INSERT INTO users(name, email) VALUES($1, $2)`,
      [name, email]
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
    const response = await db.query(`DELETE FROM users WHERE uid = $1`, [id]);
    res.status(201).json({ message: "Usuario eliminado" });
  } catch (error) {
    console.log("Error al eliminar: ", error);
  }
};
