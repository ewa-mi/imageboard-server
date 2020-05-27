const { Router } = require("express");
const Image = require("../models").image;

const router = new Router();

// router.get("/", async (req, res, next) => {
//   try {
//     const images = await Image.findAll();
//     res.json(images);
//   } catch (e) {
//     next(e);
//   }
// });

router.get("/", (req, res, next) => {
  const limit = Math.min(parseInt(req.query.limit) || 25, 500);
  const offset = parseInt(req.query.offset) || 0;

  Image.findAndCountAll({ limit, offset })
    .then((result) => res.send({ images: result.rows, total: result.count }))
    .catch((error) => next(error));
});

router.post("/", async (req, res, next) => {
  try {
    const { title, url } = req.body;
    console.log(req.body);

    if (!title || !url) {
      res.status(400).send("something went wrong");
    } else {
      const newImage = await Image.create(req.body);
      res.json(newImage);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
