const mongoose = require("mongoose");
const { Schema } = mongoose;

const author = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 25,
    unique: true,
  },
});

module.exports = mongoose.model("Author", author);
