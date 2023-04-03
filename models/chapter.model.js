const mongoose = require("mongoose");
const { Schema } = mongoose;

const chapter = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 25,
      unique: true,
    },
    content: {
      type: String,
      default:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque purus semper eget duis at tellus at urna. Arcu dictum varius duis at consectetur lorem donec massa sapien. Purus viverra accumsan in nisl nisi scelerisque eu. Vitae purus faucibus ornare suspendisse sed nisi.",
    },
    novelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Novel",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chapter", chapter);