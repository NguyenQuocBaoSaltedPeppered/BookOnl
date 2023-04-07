const mongoose = require("mongoose");
const { Schema } = mongoose;

const novel = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 25,
    unique: true,
  },
  intro: {
    type: String,
    default:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque purus semper eget duis at tellus at urna. Arcu dictum varius duis at consectetur lorem donec massa sapien. Purus viverra accumsan in nisl nisi scelerisque eu. Vitae purus faucibus ornare suspendisse sed nisi.",
  },
  types: [String],
  coverLink: {
    type: String,
    default:
      "https://img.freepik.com/premium-psd/book-cover-mockup_125540-572.jpg?w=996",
  },
  readCount: {
    type: Number,
    require: true,
    default: 0,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
  accountPostedId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  },
});

module.exports = mongoose.model("Novel", novel);
