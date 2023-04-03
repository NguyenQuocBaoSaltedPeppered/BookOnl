const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookmark = new Schema({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  },
  novelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Novel",
  },
});

module.exports = mongoose.model("Bookmark", bookmark);
