import express from "express";
import { getAvatar, uploadAvatar } from "../controllers/user.js";
import updateMiddleware from "../middleware/upload.js";

const usersRouter = express.Router();

usersRouter.get("/avatar", getAvatar);
usersRouter.patch("/avatar", updateMiddleware.single("avatar"), uploadAvatar);

export default usersRouter;
