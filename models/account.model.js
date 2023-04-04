const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

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

// static signup function
account.statics.signup = async function (
  name,
  email,
  password,
  avatarLink,
  isAdmin
) {
  if (!email || !password || !name) {
    throw Error("All field must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email not valid!");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough!");
  }
  const isEmailExists = await this.findOne({ email });

  if (isEmailExists) {
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

//static login function
account.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All field must be filled");
  }

  const acc = await this.findOne({ email });
  if (!acc) {
    throw Error("Incorrect Email!");
  }
  const isPasswordMatch = await bcrypt.compare(password, acc.password);
  if (!isPasswordMatch) {
    throw Error("Password is incorrect!");
  }

  return acc;
};

module.exports = mongoose.model("Account", account);
