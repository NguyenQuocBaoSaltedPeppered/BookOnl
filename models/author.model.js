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

author.statics.createnew = async function (name) {
  if (!name) {
    throw Error("Name field must be filled");
  }

  const isExists = await this.findOne({ name });

  if (isExists) {
    throw Error("Author already existed!");
  }

  const newAuthor = await this.create({ name });

  return newAuthor;
};

module.exports = mongoose.model("Author", author);
