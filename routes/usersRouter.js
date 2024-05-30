import express from "express";
import { uploadAvatar } from "../controllers/userControllers.js";
import updateMiddleware from "../middleware/upload.js";

const usersRouter = express.Router();

usersRouter.patch("/avatar", updateMiddleware.single("avatar"), uploadAvatar);

export default usersRouter;
