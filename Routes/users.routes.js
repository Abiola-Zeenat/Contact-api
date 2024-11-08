import express from "express";
const router = express.Router();
import {
  getUsers,
  getUser,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

router.get("/", getUsers);

router.get("/:id", getUser);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
