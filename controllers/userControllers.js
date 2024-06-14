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

    const avatarURL = path.join("avatars", req.file.filename);

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        avatarURL,
      },
      { new: true }
    );

    if (user === null) throw new HttpError(404, "User not found");

    res.send(user);
  } catch (error) {
    next(error);
  }
};

export const userToken = async (req, res, next) => {
  const { token } = req.params;
  try {
    const user = await User.findOne({ verifyToken: token });

    if (user === null) {
      throw HttpError(404, "User not found");
    }

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verifyToken: null,
    });

    res.status(200).send({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
};

export async function repeatVerify(req, res, next) {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).send({ message: "Please enter correct email" });
    }

    const user = await User.findOne({ email });
    const token = user.verificationToken;

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (user.verify === true) {
      return res
        .status(400)
        .send({ message: "Verification has already been passed" });
    }

    await mail.sendMail(email);

    res.status(200).send({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
}
