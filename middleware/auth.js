import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (typeof authorization === "undefined")
    res.status(401).send({ message: "Invalid token" });

  const [bearer, token] = authorization.split(" ", 2);

  if (bearer !== "Bearer") throw HttpError(401);
  // res.status(401).send({ message: "Invalid token" });

  jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
    if (error) throw HttpError(401);
    // res.status(401).send({ message: "Invalid token" });

    req.user = {
      id: decode.id,
    };

    next();
  });
};

export default auth;
