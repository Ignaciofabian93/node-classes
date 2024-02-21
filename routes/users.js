import { Router } from "express";
import {
  getUsers,
  updateUser,
  createUser,
  deleteUser,
  loginUser,
} from "../controllers/users.js";
import { isAuthenticated } from "../middlewares/auth.js";

const usuarios = Router();

// http://localhost:3001/api/users ===> /
// http://localhost:3001/api/users/allusers
// http://localhost:3001/api/users/id
usuarios.get("/allusers", isAuthenticated, getUsers);
// usuarios.post("/:id", getUser);
usuarios.post("/login", loginUser);
usuarios.route("/:id").put(updateUser).delete(deleteUser);
usuarios.post("/create", createUser);
// usuarios.delete("/:id", deleteUser);

export default usuarios;
