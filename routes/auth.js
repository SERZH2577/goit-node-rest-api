import express from "express";
import { register, login, logout, current } from "../controllers/auth.js";
import { userSchema } from "../schemas/usersSchemas.js";
import validateBody from "../helpers/validateBody.js";
import authMiddleware from "../middleware/auth.js";

const usersRouter = express.Router();
const jsonParser = express.json();

usersRouter.post("/register", validateBody(userSchema), jsonParser, register);
usersRouter.post("/login", validateBody(userSchema), jsonParser, login);
usersRouter.get("/current", authMiddleware, current);
usersRouter.get("/logout", authMiddleware, logout);

export default usersRouter;
