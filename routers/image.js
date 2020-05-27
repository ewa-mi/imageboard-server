const { Router } = require("express");
const Image = require("../models").image;

const router = new Router();

router.get("/", async (request, response) => {
  try {
    const images = await Image.findAll();
    res.json(images);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
