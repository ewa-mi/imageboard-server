const { Router } = require("express");
const bcrypt = require("bcrypt");
const User = require("../models").user;

const { toJWT } = require("../auth/jwt");

const router = new Router();

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send("Missing login parameters");
  } else {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(404).send("User with this email address doesn't exist");
    } else {
      const passwordsMatch = bcrypt.compareSync(password, user.password);

      if (passwordsMatch) {
        const token = toJWT({ userId: user.id });

        res.send({ token });
      } else {
        res.status(400).send("Wrong password");
      }
    }
  }
});

module.exports = router;
