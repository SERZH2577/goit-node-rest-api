import jimp from "jimp";
import * as fs from "node:fs/promises";
import path from "node:path";
import User from "../models/users.js";
import sendMail from "../mail/mail.js";
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
  const { verificationToken } = req.params;
  try {
    const user = await User.findOne({ verificationToken });

    if (user === null) {
      throw HttpError(404, "User not found");
    }

    await User.findOneAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });

    res.status(200).send({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
};

export async function reVerification(req, res, next) {
  const { email } = req.body;

  try {
    if (email === null) {
      return res.status(400).send({ message: "Please enter email" });
    }

    const user = await User.findOne({ email });
    const token = user.verificationToken;

    if (email === null) {
      return res.status(404).send({ message: "User not found" });
    }

    if (user.verify === true) {
      return res
        .status(400)
        .send({ message: "Verification has already been passed" });
    }

    await sendMail(email, token);

    res.status(200).send({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
}
