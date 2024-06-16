import express from "express";
import {
  uploadAvatar,
  userToken,
  reVerification,
} from "../controllers/userControllers.js";
import updateMiddleware from "../middleware/upload.js";
import authMiddleware from "../middleware/auth.js";
import { emailSchema } from "../schemas/usersSchemas.js";
import validateBody from "../helpers/validateBody.js";

const usersRouter = express.Router();

usersRouter.get("/verify/:verificationToken", userToken);
usersRouter.post("/verify", validateBody(emailSchema), reVerification);
usersRouter.patch(
  "/avatar",
  authMiddleware,
  updateMiddleware.single("avatar"),
  uploadAvatar
);

export default usersRouter;
