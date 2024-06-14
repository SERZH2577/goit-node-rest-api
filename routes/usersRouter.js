import express from "express";
import {
  uploadAvatar,
  userToken,
  repeatVerify,
} from "../controllers/userControllers.js";
import updateMiddleware from "../middleware/upload.js";
import authMiddleware from "../middleware/auth.js";
import { emailSchema } from "../schemas/usersSchemas.js";
import validateBody from "../helpers/validateBody.js";

const usersRouter = express.Router();

usersRouter.get("/verify/:verifyToken", userToken);
usersRouter.post("/verify", validateBody(emailSchema), repeatVerify);
usersRouter.patch(
  "/avatar",
  authMiddleware,
  updateMiddleware.single("avatar"),
  uploadAvatar
);

export default usersRouter;
