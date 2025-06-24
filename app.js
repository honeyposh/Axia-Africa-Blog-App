require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("successfully connected to mongodb");
  })
  .catch((error) => {
    console.log(error);
  });
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
const kycRoute = require("./routes/kycRoute");
app.use(express.json());
app.use(cookieParser());
app.use(userRoute);
app.use(postRoute);
app.use(kycRoute);
const port = 8000;
app.listen(8000, () => {
  console.log(`Server Listen on port ${port}`);
});
