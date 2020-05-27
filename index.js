const express = require("express");
const userRouter = require("./routers/user");
const imageRouter = require("./routers/image");

const port = process.env.PORT || 4000;
const app = express();

app.use("/users", userRouter);
app.use("/images", imageRouter);

app.listen(port, () => console.log(`listening on port ${port}!`));
