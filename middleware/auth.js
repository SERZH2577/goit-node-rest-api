import jwt from "jsonwebtoken";
import User from "../models/users.js";
import HttpError from "../helpers/HttpError.js";

const auth = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (typeof authorization === "undefined")
    throw HttpError(401, "Not authorized");

  const [bearer, token] = authorization.split(" ", 2);

  if (bearer !== "Bearer") throw HttpError(401, "Not authorized");

  jwt.verify(token, process.env.JWT_SECRET, async (error, decode) => {
    if (error) throw HttpError(401, "Not authorized");

    try {
      const user = await User.findById(decode.id);

      if (user === null) throw HttpError(401, "Not authorized");
      if (user.token !== token) throw HttpError(401, "Not authorized");

      req.user = user;

      next();
    } catch (error) {
      next(error);
    }
  });
};

export default auth;
