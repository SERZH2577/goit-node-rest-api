import express from "express";
import { register, login } from "../controllers/auth.js";
import { userSchema } from "../schemas/usersSchemas.js";
import validateBody from "../helpers/validateBody.js";

const usersRouter = express.Router();
const jsonParser = express.json();

usersRouter.post("/register", validateBody(userSchema), jsonParser, register);
usersRouter.post("/login", validateBody(userSchema), jsonParser, login);

export default usersRouter;
