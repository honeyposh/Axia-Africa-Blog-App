const mongoose = require("mongoose");
const bookScheme = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    author: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);
const bookModel = mongoose.model("Book", bookScheme);
module.exports = bookModel;
