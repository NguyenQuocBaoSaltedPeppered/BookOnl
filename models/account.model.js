const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const account = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 100,
  },
  avatarLink: {
    type: String,
    required: true,
    default:
      "https://cdn3.iconfinder.com/data/icons/toolbar-people/512/reader_acrobat_adobe_rss_news_google_feed-512.png",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// static signup Method
account.statics.signup = async function (
  name,
  email,
  password,
  avatarLink,
  isAdmin
) {
  const isExists = await this.findOne({ email });

  if (isExists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const newAccount = await this.create({
    name,
    email,
    password: hash,
    avatarLink,
    isAdmin,
  });

  return newAccount;
};
module.exports = mongoose.model("Account", account);
