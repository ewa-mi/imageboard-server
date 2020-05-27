const { Router } = require("express");
const bcrypt = require("bcrypt");
const User = require("../models").user;
const authMiddleware = require("../auth/middleware");
const router = new Router();

router.get("/", authMiddleware, async (req, res, next) => {
  try {
    console.log("Show me this user", req.user.id);
    const users = await User.findAll();
    res.send(users);
  } catch (e) {
    next(e);
  }
});

// router.get("/", async (req, res, next) => {
//   try {
//     const allUsers = await User.findAll();
//     res.json(allUsers);
//   } catch (e) {
//     next(e);
//   }
// });

router.post("/", async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body;

    if (!email || !password || !fullName) {
      res.status(400).send("missing parameters");
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10);

      const newUser = await User.create({
        email,
        password: hashedPassword,
        fullName,
      });
      res.send(newUser);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
