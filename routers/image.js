const { Router } = require("express");
const Image = require("../models").image;

const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const images = await Image.findAll();
    res.json(images);
  } catch (e) {
    next(e);
  }
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
