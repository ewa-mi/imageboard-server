const { toData } = require("./jwt");
const User = require("../models").user;

const authMiddleware = async (req, res, next) => {
  // 1.
  const authHeader =
    req.headers.authorization && req.headers.authorization.split(" ");
  if (authHeader && authHeader[0] === "Bearer" && authHeader[1]) {
    // 2.
    try {
      const data = toData(authHeader[1]);
      // 3.
      const user = await User.findByPk(data.userId);

      if (!user) {
        res.status(404).send("User doesn't exist");
      } else {
        req.user = user;
        next();
      }
    } catch (error) {
      res.status(400).send(`${error.name}, ${error.message}`);
    }
  } else {
    res.status(400).send("missing authorization header");
  }
  // "Bearer <token>"
};

module.exports = authMiddleware;
