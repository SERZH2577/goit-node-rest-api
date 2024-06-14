import crypto from "node:crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import User from "../models/users.js";
import sendMail from "../mail/mail.js";
import HttpError from "../helpers/HttpError.js";

export const register = async (req, res, next) => {
  const { email, password } = req.body;
  const emailInLowerCase = email.toLowerCase();

  try {
    const user = await User.findOne({ email: emailInLowerCase });

    if (user !== null) throw HttpError(409, "Email in use");

    const passwordHash = await bcrypt.hash(password, 10);
    const defaultAvatar = gravatar.url(email);
    const verifyToken = crypto.randomUUID();

    const newUser = await User.create({
      email: emailInLowerCase,
      password: passwordHash,
      avatarURL: defaultAvatar,
      token: verifyToken,
    });

    await sendMail(email);

    res.status(201).json({
      user: {
        email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const emailInLowerCase = email.toLowerCase();

  try {
    const user = await User.findOne({ email: emailInLowerCase });
    if (user === null) throw HttpError(401, "Email or password is wrong");

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch === false) throw HttpError(401, "Email or password is wrong");

    if (user.verify === false) throw HttpError(401, "Please verify your email");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    await User.findByIdAndUpdate(user._id, { token });

    res.json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const current = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

export const logout = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { token: null });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
