import * as fs from "node:fs/promises";
import path from "node:path";
import User from "../models/users.js";
import HttpError from "../helpers/HttpError.js";

export const getAvatar = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (user === null) throw new HttpError(404, "User not found");
    if (user.avatar === null) throw new HttpError(404, "Avatar not found");

    res.sendFile(path.resolve("public/avatar", user.avatar));
  } catch (error) {
    next(error);
  }
};

export const uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) throw new HttpError(400, "No file uploaded");

    await fs.rename(
      req.file.path,
      path.resolve("public/avatar", req.file.filename)
    );

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        avatar: req.file.filename,
      },
      { new: true }
    );

    if (user === null) throw new HttpError(404, "User not found");

    res.send(user);
  } catch (error) {
    next(error);
  }
};
