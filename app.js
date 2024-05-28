import "dotenv/config";
import path from "node:path";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import contactsRouter from "./routes/contactsRouter.js";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";
import authMiddleware from "./middleware/auth.js";
import "./db.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/avatar", express.static(path.resolve("public/avatar")));

app.use("/api/contacts", authMiddleware, contactsRouter);
app.use("/auth", authRouter);
app.use("/api/users", authMiddleware, usersRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});
