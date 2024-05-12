import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const register = async (req, res, next) => {
  const { email, password } = req.body;
  const emailInLowerCase = email.toLowerCase();

  try {
    const user = await User.findOne({ email: emailInLowerCase });

    if (user !== null) throw HttpError(409);
    //  res.status(409).send({ message: "Use already registered" });

    const passwordHash = await bcrypt.hash(password, 10);

    await User.create({
      email: emailInLowerCase,
      password: passwordHash,
    });

    res.status(201).send({ message: "Registration successfully" });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const emailInLowerCase = email.toLowerCase();

  try {
    const user = await User.findOne({ email: emailInLowerCase });

    if (user === null) throw HttpError(401);
    // res.status(401).send({ message: "Email or password is wrong" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch === false) throw HttpError(401);
    // res.status(401).send({ message: "Email or password is wrong" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.send({ token });
  } catch (error) {
    next(error);
  }
};
