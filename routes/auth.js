import express from "express";
import { register, login, logout, current } from "../controllers/auth.js";
import { userSchema } from "../schemas/usersSchemas.js";
import validateBody from "../helpers/validateBody.js";
import authMiddleware from "../middleware/auth.js";

const authRouter = express.Router();
const jsonParser = express.json();

authRouter.post("/register", validateBody(userSchema), jsonParser, register);
authRouter.post("/login", validateBody(userSchema), jsonParser, login);
authRouter.get("/current", authMiddleware, current);
authRouter.get("/logout", authMiddleware, logout);

export default authRouter;
