import { Router } from "express";
import {
  getUsers,
  getUser,
  updateUser,
  createUser,
  deleteUser,
} from "../controllers/users.js";

const usuarios = Router();

// http://localhost:3001/api/users ===> /
// http://localhost:3001/api/users/allusers
// http://localhost:3001/api/users/id
usuarios.get("/allusers", getUsers);
// usuarios.post("/:id", getUser);
usuarios.put("/:id", updateUser);
usuarios.post("/create", createUser);
usuarios.delete("/:id", deleteUser);

export default usuarios;
