const express = require("express");
const userRouter = require("./routers/user");
const imageRouter = require("./routers/image");
const cors = require("cors");
const authRouter = require("./routers/auth");
const authMiddleware = require("./auth/middleware");

const port = process.env.PORT || 4000;
const app = express();

//middleware
app.use(cors());
const jsonParser = express.json();
app.use(jsonParser);

app.use("/users", userRouter);
app.use("/images", authMiddleware, imageRouter);
app.use("/auth", authRouter);

app.listen(port, () => console.log(`listening on port ${port}!`));
