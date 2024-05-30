import jimp from "jimp";
import * as fs from "node:fs/promises";
import path from "node:path";
import User from "../models/users.js";
import HttpError from "../helpers/HttpError.js";

export const uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) throw new HttpError(400, "No file uploaded");

    const userAvatar = await jimp.read(req.file.path);
    await userAvatar.cover(250, 250).writeAsync(req.file.path);

    await fs.rename(
      req.file.path,
      path.resolve("public/avatar", req.file.filename)
    );

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        avatarURL: req.file.filename,
      },
      { new: true }
    );

    if (user === null) throw new HttpError(404, "User not found");

    res.send(user);
  } catch (error) {
    next(error);
  }
};
